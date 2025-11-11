import { useState } from "react";
import { Wand2, Sparkles, AlertTriangle, Target, Zap } from "lucide-react";
import Card from "../components/common/Card";
import Tag from "../components/common/Tag";
import {
  swotData,
  businessModelCanvas,
  financialProjection,
} from "../data/mockData";
import { formatOMR } from "../utils/calculations";
import "./SmartPlan.css";

const SmartPlan = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationCount, setOptimizationCount] = useState(0);

  const handleAITuning = async () => {
    setIsOptimizing(true);

    // Simulate AI optimization (in production, this would be an API call)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsOptimizing(false);
    setOptimizationCount(optimizationCount + 1);
  };

  return (
    <div className="smart-plan">
      <div className="container">
        <div className="page-header">
          <h1>منشئ الخطة الذكية</h1>
          <p className="page-description">
            خطة استراتيجية تم إنشاؤها تلقائياً لأعمال B2B SaaS الخاصة بك في سوق
            ظفار وعُمان.
          </p>
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={handleAITuning}
              disabled={isOptimizing}
            >
              <Wand2 size={18} />
              {isOptimizing ? "جاري إعادة التحسين..." : "تطبيق التحسين الذكي"}
            </button>
            {optimizationCount > 0 && (
              <Tag variant="success">تم التحسين {optimizationCount}x</Tag>
            )}
          </div>
          <p className="prototype-label mt-sm">
            محتوى تم إنشاؤه تلقائياً - نموذج أمامي
          </p>
        </div>

        {/* SWOT Analysis */}
        <Card className="plan-section fade-in">
          <h2 className="section-title">تحليل SWOT</h2>
          <p className="section-subtitle">
            التحليل الاستراتيجي لـ B2B SaaS في منطقة ظفار
          </p>

          <div className="swot-grid">
            <div className="swot-item swot-strengths">
              <h3 className="swot-title">
                <Sparkles className="swot-icon" size={24} strokeWidth={2} />
                نقاط القوة
              </h3>
              <ul className="swot-list">
                {swotData.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-item swot-weaknesses">
              <h3 className="swot-title">
                <AlertTriangle
                  className="swot-icon"
                  size={24}
                  strokeWidth={2}
                />
                نقاط الضعف
              </h3>
              <ul className="swot-list">
                {swotData.weaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-item swot-opportunities">
              <h3 className="swot-title">
                <Target className="swot-icon" size={24} strokeWidth={2} />
                الفرص
              </h3>
              <ul className="swot-list">
                {swotData.opportunities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-item swot-threats">
              <h3 className="swot-title">
                <Zap className="swot-icon" size={24} strokeWidth={2} />
                التهديدات
              </h3>
              <ul className="swot-list">
                {swotData.threats.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Business Model Canvas */}
        <Card className="plan-section scale-in">
          <h2 className="section-title">نموذج الأعمال التجارية</h2>
          <p className="section-subtitle">
            نموذج أعمال متكامل لشركة SaaS الناشئة في ظفار
          </p>

          <div className="bmc-grid">
            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.customerSegments.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.customerSegments.items.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.valuePropositions.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.valuePropositions.items.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.channels.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.channels.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.customerRelationships.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.customerRelationships.items.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.revenueStreams.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.revenueStreams.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.keyResources.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.keyResources.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.keyActivities.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.keyActivities.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.keyPartners.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.keyPartners.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bmc-item">
              <h4 className="bmc-label">
                {businessModelCanvas.costStructure.label}
              </h4>
              <ul className="bmc-list">
                {businessModelCanvas.costStructure.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Financial Projection */}
        <Card className="plan-section fade-in">
          <h2 className="section-title">لمحة مالية لمدة 3 سنوات</h2>
          <p className="section-subtitle">
            مسار النمو المتوقع (جميع القيم بالريال العماني)
          </p>

          <div className="financial-grid">
            {[
              financialProjection.year1,
              financialProjection.year2,
              financialProjection.year3,
            ].map((year) => (
              <div key={year.year} className="year-card">
                <div className="year-header">
                  <h3 className="year-title">السنة {year.year}</h3>
                  <Tag variant={year.profitMargin > 50 ? "success" : "warning"}>
                    هامش {year.profitMargin.toFixed(1)}٪
                  </Tag>
                </div>

                <div className="year-metrics">
                  <div className="year-metric">
                    <div className="year-metric-label">العملاء</div>
                    <div className="year-metric-value">{year.customers}</div>
                  </div>
                  <div className="year-metric">
                    <div className="year-metric-label">
                      الإيرادات الشهرية المتكررة
                    </div>
                    <div className="year-metric-value">
                      {formatOMR(year.mrr)}
                    </div>
                  </div>
                  <div className="year-metric">
                    <div className="year-metric-label">
                      الإيرادات السنوية المتكررة
                    </div>
                    <div className="year-metric-value">
                      {formatOMR(year.arr)}
                    </div>
                  </div>
                  <div className="year-metric">
                    <div className="year-metric-label">الإيرادات</div>
                    <div className="year-metric-value">
                      {formatOMR(year.revenue)}
                    </div>
                  </div>
                  <div className="year-metric">
                    <div className="year-metric-label">التكاليف</div>
                    <div className="year-metric-value">
                      {formatOMR(year.costs)}
                    </div>
                  </div>
                  <div className="year-metric">
                    <div className="year-metric-label">الربح</div>
                    <div className="year-metric-value year-profit">
                      {formatOMR(year.profit)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="financial-notes">
            <p>
              <strong>ملاحظة:</strong> تفترض التوقعات اقتصاديات وحدة صحية
              (LTV/CAC ≥ 3) واختراقاً تدريجياً للسوق في ظفار. تتضمن السنتان 2-3
              إمكانية التوسع إلى سوق مسقط.
            </p>
          </div>
        </Card>

        {isOptimizing && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">
              جاري إعادة تحسين الخطة برؤى الذكاء الاصطناعي...
            </p>
            <p className="loading-text">جاري التعديل لظروف سوق ظفار...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartPlan;
