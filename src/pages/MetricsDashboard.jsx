import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../components/common/Card";
import KpiBox from "../components/common/KpiBox";
import ScenarioStatus from "../components/common/ScenarioStatus";
import { successfulScenario, atRiskScenario } from "../data/mockData";
import { formatOMR, formatPercentage } from "../utils/calculations";
import { buildScenariosFromInputs } from "../utils/scenarioEngine";
import "./MetricsDashboard.css";

const MetricsDashboard = () => {
  const location = useLocation();
  const override = location.state?.scenarioPack;
  const [pack, setPack] = useState(override || null);
  const [isHealthy, setIsHealthy] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const healthyScenario =
    pack?.healthy || override?.healthy || successfulScenario;
  const riskScenario = pack?.risk || override?.risk || atRiskScenario;
  const currentScenario = isHealthy ? healthyScenario : riskScenario;

  const handleScenarioToggle = async () => {
    setIsLoading(true);

    // Simulate scenario recalculation (in production, this would fetch new data)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsHealthy(!isHealthy);
    setIsLoading(false);
  };

  // Tooltips for KPI boxes
  // Tooltips بصيغ رقمية حيّة
  const last = currentScenario.monthlyData?.[11];
  const first = currentScenario.monthlyData?.[0];
  const arpaVal = currentScenario.metrics.arpa || 0;
  const gmVal = (currentScenario.metrics.grossMargin || 0) / 100;
  const churnMonthly = (currentScenario.metrics.avgChurn || 0) / 100;
  const lifetime = churnMonthly > 0 ? +(1 / churnMonthly).toFixed(1) : 0;
  const ltvDynamic = +(arpaVal * gmVal * (lifetime || 0)).toFixed(1);
  const tooltips = {
    mrr: `MRR = العملاء × ARPA = ${last?.customers ?? "-"} × ${formatOMR(
      arpaVal
    )} → ${formatOMR(last?.mrr ?? 0)}`,
    ltv: `LTV = ARPA × هامش الربح × العمر = ${formatOMR(arpaVal)} × ${(
      gmVal * 100
    ).toFixed(0)}% × ${lifetime} = ${formatOMR(ltvDynamic)}`,
    cac: `CAC = إنفاق التسويق والمبيعات ÷ العملاء الجدد`,
    ltvCac: `LTV/CAC = ${formatOMR(currentScenario.metrics.ltv)} ÷ ${formatOMR(
      currentScenario.metrics.cac
    )}`,
    churn: `التسرب الشهري ≈ ${currentScenario.metrics.avgChurn}% ⇒ العمر ≈ ${lifetime} شهر`,
    payback: `الاسترداد = CAC ÷ (ARPA × هامش الربح) = ${formatOMR(
      currentScenario.metrics.cac
    )} ÷ ${formatOMR(arpaVal * gmVal)} ≈ ${
      currentScenario.metrics.paybackPeriod
    } أشهر`,
  };

  // What-if controls
  const [whatIfOpen, setWhatIfOpen] = useState(false);
  const [adjustments, setAdjustments] = useState({
    arpaDelta: 0, // %
    cacDelta: 0, // %
    churnDelta: 0, // absolute percentage points
    smbDelta: 0, // %
  });

  const applyWhatIf = async () => {
    setIsLoading(true);
    // Get base (from healthy scenario metrics if available)
    const base = healthyScenario;
    const baseArpa = base?.metrics?.arpa ?? 50;
    const baseGM = (base?.metrics?.grossMargin ?? 75) / 100;
    const baseChurn = (base?.metrics?.avgChurn ?? 3) / 100;
    const baseCac = base?.metrics?.cac ?? 18;
    // approximate monthly S&M budget from data if available
    const avgNew = Array.isArray(base?.monthlyData)
      ? Math.max(
          1,
          Math.round(
            base.monthlyData.reduce((s, m) => s + (m.newCustomers ?? 1), 0) /
              base.monthlyData.length
          )
        )
      : 10;
    const approxSMBudget = avgNew * baseCac;

    const arpa = baseArpa * (1 + adjustments.arpaDelta / 100);
    const cac = baseCac * (1 + adjustments.cacDelta / 100);
    const churn = Math.max(0.001, baseChurn + adjustments.churnDelta / 100);
    const smb = approxSMBudget * (1 + adjustments.smbDelta / 100);

    // Rebuild scenarios using engine
    const rebuilt = buildScenariosFromInputs({
      arpa,
      grossMargin: baseGM,
      monthlyChurn: churn,
      cacEstimate: cac,
      startCustomers: base?.monthlyData?.[0]?.customers ?? 6,
      monthlySMBudget: smb,
    });
    // Simulate brief recalculation
    await new Promise((r) => setTimeout(r, 600));
    setPack(rebuilt);
    setIsLoading(false);
  };

  return (
    <div className="metrics-dashboard">
      <div className="container">
        <div className="page-header">
          <h1>مقاييس SaaS المباشرة</h1>
          <p className="page-description">
            تحليل سيناريوهات في الوقت الفعلي: مقارنة سيناريو صحي مقابل سيناريو
            معرّض للخطر لسوق ظفار.
          </p>
          <p className="prototype-label">Simulated data - Front-end demo</p>
        </div>

        {/* What-if controls */}
        <Card
          className="scenario-card fade-in"
          style={{ marginBottom: "1rem" }}
        >
          <div className="scenario-header" style={{ marginBottom: 0 }}>
            <h3 style={{ margin: 0 }}>ماذا لو؟ (What-if)</h3>
            <button
              className="btn btn-outline"
              onClick={() => setWhatIfOpen(!whatIfOpen)}
            >
              {whatIfOpen ? "إخفاء" : "إظهار"}
            </button>
          </div>
          {whatIfOpen && (
            <div className="grid grid-cols-4" style={{ marginTop: "1rem" }}>
              <div>
                <div className="form-label">تغيير ARPA %</div>
                <input
                  className="form-input"
                  type="number"
                  value={adjustments.arpaDelta}
                  onChange={(e) =>
                    setAdjustments({
                      ...adjustments,
                      arpaDelta: parseFloat(e.target.value || 0),
                    })
                  }
                  step="1"
                />
              </div>
              <div>
                <div className="form-label">تغيير CAC %</div>
                <input
                  className="form-input"
                  type="number"
                  value={adjustments.cacDelta}
                  onChange={(e) =>
                    setAdjustments({
                      ...adjustments,
                      cacDelta: parseFloat(e.target.value || 0),
                    })
                  }
                  step="1"
                />
              </div>
              <div>
                <div className="form-label">تغيير التسرب (نقاط مئوية)</div>
                <input
                  className="form-input"
                  type="number"
                  value={adjustments.churnDelta}
                  onChange={(e) =>
                    setAdjustments({
                      ...adjustments,
                      churnDelta: parseFloat(e.target.value || 0),
                    })
                  }
                  step="0.1"
                />
              </div>
              <div>
                <div className="form-label">تغيير ميزانية التسويق %</div>
                <input
                  className="form-input"
                  type="number"
                  value={adjustments.smbDelta}
                  onChange={(e) =>
                    setAdjustments({
                      ...adjustments,
                      smbDelta: parseFloat(e.target.value || 0),
                    })
                  }
                  step="5"
                />
              </div>
              <div className="flex" style={{ alignItems: "flex-end" }}>
                <button className="btn btn-primary" onClick={applyWhatIf}>
                  تطبيق
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Scenario Toggle */}
        <div className="scenario-toggle-wrapper">
          <ScenarioStatus
            status={isHealthy ? "healthy" : "at-risk"}
            onClick={handleScenarioToggle}
          />
        </div>

        {/* Scenario Description */}
        <Card className="scenario-card fade-in">
          <div className="scenario-header">
            <h2>{currentScenario.name}</h2>
            <span className="scenario-region">{currentScenario.region}</span>
          </div>
          <p className="scenario-description">{currentScenario.description}</p>
        </Card>

        {/* KPI Overview */}
        <div className="kpi-grid">
          <KpiBox
            label="الإيراد الشهري المتكرر (شهر 12)"
            value={formatOMR(currentScenario.monthlyData[11].mrr)}
            subtitle={`البداية من ${formatOMR(
              currentScenario.monthlyData[0].mrr
            )}`}
            tooltip={tooltips.mrr}
            variant={isHealthy ? "success" : "danger"}
          />
          <KpiBox
            label="قيمة عمر العميل LTV"
            value={formatOMR(currentScenario.metrics.ltv)}
            subtitle={`ARPA: ${formatOMR(currentScenario.metrics.arpa)}`}
            tooltip={tooltips.ltv}
            variant={isHealthy ? "success" : "warning"}
          />
          <KpiBox
            label="CAC"
            value={formatOMR(currentScenario.metrics.cac)}
            subtitle="تكلفة اكتساب العميل"
            tooltip={tooltips.cac}
            variant="default"
          />
          <KpiBox
            label="نسبة LTV/CAC"
            value={`${currentScenario.metrics.ltvCacRatio}x`}
            subtitle={
              currentScenario.metrics.ltvCacRatio >= 3 ? "صحي" : "يحتاج تحسين"
            }
            tooltip={tooltips.ltvCac}
            variant={
              currentScenario.metrics.ltvCacRatio >= 3 ? "success" : "danger"
            }
          />
          <KpiBox
            label="متوسط التسرب"
            value={formatPercentage(currentScenario.metrics.avgChurn)}
            subtitle="التسرب الشهري"
            tooltip={tooltips.churn}
            variant={
              currentScenario.metrics.avgChurn < 5 ? "success" : "danger"
            }
          />
          <KpiBox
            label="فترة الاسترداد"
            value={`${currentScenario.metrics.paybackPeriod} mo`}
            subtitle={
              currentScenario.metrics.paybackPeriod < 12 ? "جيد" : "طويلة"
            }
            tooltip={tooltips.payback}
            variant={
              currentScenario.metrics.paybackPeriod < 12 ? "success" : "warning"
            }
          />
        </div>

        {/* Charts */}
        <div className="charts-grid">
          {/* MRR Chart */}
          <Card className="chart-card scale-in">
            <h3 className="chart-title">الإيراد الشهري المتكرر (OMR)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentScenario.monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="month"
                  stroke="#9A9FB5"
                  tick={{ fill: "#9A9FB5" }}
                />
                <YAxis stroke="#9A9FB5" tick={{ fill: "#9A9FB5" }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#0D0834",
                    border: "1px solid rgba(15, 226, 180, 0.3)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#DDDDE3" }}
                  itemStyle={{ color: "#0FE2B4" }}
                />
                <Legend wrapperStyle={{ color: "#9A9FB5" }} />
                {/* Gradient area under line */}
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isHealthy ? "#0FE2B4" : "#FF4B61"}
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="100%"
                      stopColor={isHealthy ? "#0FE2B4" : "#FF4B61"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke={isHealthy ? "#0FE2B4" : "#FF4B61"}
                  strokeWidth={3}
                  dot={{ fill: isHealthy ? "#0FE2B4" : "#FF4B61", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="MRR (OMR)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Customers Chart */}
          <Card
            className="chart-card scale-in"
            style={{ animationDelay: "100ms" }}
          >
            <h3 className="chart-title">نمو العملاء (جدد مقابل مفقودين)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentScenario.monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="month"
                  stroke="#9A9FB5"
                  tick={{ fill: "#9A9FB5" }}
                />
                <YAxis stroke="#9A9FB5" tick={{ fill: "#9A9FB5" }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#0D0834",
                    border: "1px solid rgba(15, 226, 180, 0.3)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#DDDDE3" }}
                />
                <Legend wrapperStyle={{ color: "#9A9FB5" }} />
                <Bar
                  dataKey="newCustomers"
                  name="عملاء جدد"
                  fill="#329FBA"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="churned"
                  name="عملاء مفقودون"
                  fill="#FF4B61"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Churn Chart */}
          <Card
            className="chart-card scale-in"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="chart-title">معدل التسرب الشهري (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentScenario.monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="month"
                  stroke="#9A9FB5"
                  tick={{ fill: "#9A9FB5" }}
                />
                <YAxis stroke="#9A9FB5" tick={{ fill: "#9A9FB5" }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#0D0834",
                    border: "1px solid rgba(15, 226, 180, 0.3)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#DDDDE3" }}
                  itemStyle={{ color: "#FFA726" }}
                />
                <Legend wrapperStyle={{ color: "#9A9FB5" }} />
                <Line
                  type="monotone"
                  dataKey="churn"
                  stroke={isHealthy ? "#FFA726" : "#FF4B61"}
                  strokeWidth={3}
                  dot={{ fill: isHealthy ? "#FFA726" : "#FF4B61", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Churn %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Insights */}
        <Card
          className={`insights-card ${
            isHealthy ? "insights-success" : "insights-danger"
          } fade-in`}
        >
          <h3 className="insights-title">
            {isHealthy ? "✓ أهم الملاحظات" : "⚠ عوامل الخطر"}
          </h3>
          <ul className="insights-list">
            {currentScenario.insights.map((insight, index) => (
              <li key={index} className="insight-item">
                {insight}
              </li>
            ))}
          </ul>
        </Card>

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">Re-running Risepreneur insights...</p>
            <p className="loading-text">Recalculating forecast...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsDashboard;
