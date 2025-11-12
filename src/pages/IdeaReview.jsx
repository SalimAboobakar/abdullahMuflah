import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Card from "../components/common/Card";
import Tag from "../components/common/Tag";
import {
  estimateMetricsFromIdea,
  generateRecommendations,
  formatOMR,
} from "../utils/calculations";
import "./IdeaReview.css";

const IdeaReview = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    startupName: "",
    targetCustomers: "",
    businessType: "SaaS",
    pricing: "",
    expectedCustomers: "",
    operatingCost: "",
    marketingBudget: "",
    grossMarginPct: 75,
    churnPct: 3,
    segment: "B2B",
    aov: "", // Average order/value per transaction (for غير SaaS)
    opm: "", // Orders per customer per month (لغير SaaS)
    takeRatePct: 100, // لماركيت بليس/عمولات
  });
  const [results, setResults] = useState(null);
  const [scenarioPack, setScenarioPack] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state with AI-style message
    setIsLoading(true);
    setShowResults(false);

    // Simulate AI analysis (in production, this would be an API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate metrics
    // اشتقاق ARPA بحسب نوع النشاط
    const isSaaS = formData.businessType === "SaaS";
    const effectiveARPA = isSaaS
      ? parseFloat(formData.pricing)
      : parseFloat(formData.aov || 0) *
          parseFloat(formData.opm || 0) *
          (parseFloat(formData.takeRatePct || 100) / 100) || 0;

    const numericData = {
      pricing: effectiveARPA,
      expectedCustomers: parseFloat(formData.expectedCustomers),
      operatingCost: parseFloat(formData.operatingCost),
      marketingBudget: parseFloat(formData.marketingBudget),
      grossMarginPct: parseFloat(formData.grossMarginPct),
      churnPct: parseFloat(formData.churnPct),
    };

    const metrics = estimateMetricsFromIdea(numericData);
    const recommendations = generateRecommendations(formData, metrics);

    setResults({
      ...metrics,
      recommendations,
      startupName: formData.startupName,
    });

    // Build scenario pack from inputs (front-end only)
    try {
      const arpa = effectiveARPA || 50;
      const grossMargin = (parseFloat(formData.grossMarginPct) || 75) / 100;
      const churnMonthly = (parseFloat(formData.churnPct) || 3) / 100;
      const cacEstimate = metrics.estimatedCAC || 18;
      const monthlySMBudget = parseFloat(formData.marketingBudget) || 800;
      const { buildScenariosFromInputs } = await import(
        "../utils/scenarioEngine.js"
      );
      const built = buildScenariosFromInputs({
        arpa,
        grossMargin,
        monthlyChurn: churnMonthly,
        cacEstimate,
        startCustomers: 6,
        monthlySMBudget,
      });
      setScenarioPack(built);
    } catch {
      setScenarioPack(null);
    }

    setIsLoading(false);
    setShowResults(true);
  };

  const getRiskVariant = (riskLevel) => {
    switch (riskLevel) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="idea-review">
      <div className="container">
        <div className="page-header">
          <h1>التحليل الذكي بالذكاء الاصطناعي</h1>
          <p className="page-description">
            احصل على تحليل فوري لفكرة SaaS الخاصة بك مع رؤى مدعومة بالذكاء
            الاصطناعي لسوق ظفار وعُمان.
          </p>
          <p className="prototype-label">
            تحليل محاكى بالذكاء الاصطناعي - نموذج تجريبي
          </p>
        </div>

        {!showResults ? (
          <Card className="review-form-card fade-in">
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label className="form-label">نوع النشاط</label>
                <select
                  name="businessType"
                  className="form-select"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="SaaS">SaaS (اشتراكات برمجية)</option>
                  <option value="Services">خدمات</option>
                  <option value="Ecommerce">متجر إلكتروني</option>
                  <option value="Marketplace">سوق/وسيط (Marketplace)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">اسم الشركة الناشئة</label>
                <input
                  type="text"
                  name="startupName"
                  className="form-input"
                  placeholder="مثال: OpsFlow، InventoryHub"
                  value={formData.startupName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">العملاء المستهدفون</label>
                <textarea
                  name="targetCustomers"
                  className="form-textarea"
                  placeholder="مثال: الشركات الصغيرة والمتوسطة في صلالة، الفنادق في ظفار، شركات الخدمات اللوجستية"
                  value={formData.targetCustomers}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {formData.businessType === "SaaS"
                      ? "التسعير الشهري (ريال عماني)"
                      : "سعر الاشتراك/الإيراد الشهري لكل عميل (سيُشتق آلياً من الحقول أدناه)"}
                  </label>
                  <input
                    type="number"
                    name="pricing"
                    className="form-input"
                    placeholder="مثال: 50"
                    value={formData.pricing}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    disabled={formData.businessType !== "SaaS"}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    العملاء المتوقعون خلال 12 شهراً
                  </label>
                  <input
                    type="number"
                    name="expectedCustomers"
                    className="form-input"
                    placeholder="مثال: 50"
                    value={formData.expectedCustomers}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              {formData.businessType !== "SaaS" && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        متوسط قيمة الطلب/الخدمة (OMR)
                      </label>
                      <input
                        type="number"
                        name="aov"
                        className="form-input"
                        placeholder="مثال: 20"
                        value={formData.aov}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        عدد الطلبات للعميل شهرياً
                      </label>
                      <input
                        type="number"
                        name="opm"
                        className="form-input"
                        placeholder="مثال: 1.5"
                        value={formData.opm}
                        onChange={handleChange}
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        نسبة العمولة/Take rate (%)
                      </label>
                      <input
                        type="number"
                        name="takeRatePct"
                        className="form-input"
                        placeholder="100 للمتاجر/الخدمات، 10–20 للسوق"
                        value={formData.takeRatePct}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        step="1"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    تكلفة التشغيل الشهرية (ريال عماني)
                  </label>
                  <input
                    type="number"
                    name="operatingCost"
                    className="form-input"
                    placeholder="مثال: 1500"
                    value={formData.operatingCost}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    ميزانية التسويق (ريال عماني)
                  </label>
                  <input
                    type="number"
                    name="marketingBudget"
                    className="form-input"
                    placeholder="مثال: 800"
                    value={formData.marketingBudget}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">الهامش الإجمالي (%)</label>
                  <input
                    type="number"
                    name="grossMarginPct"
                    className="form-input"
                    placeholder="مثال: 75"
                    value={formData.grossMarginPct}
                    onChange={handleChange}
                    min="40"
                    max="95"
                    step="1"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">التسرب الشهري (Churn %)</label>
                  <input
                    type="number"
                    name="churnPct"
                    className="form-input"
                    placeholder="مثال: 3"
                    value={formData.churnPct}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">نوع الشريحة</label>
                  <select
                    name="segment"
                    className="form-select"
                    value={formData.segment}
                    onChange={handleChange}
                  >
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-submit">
                <TrendingUp size={20} />
                حلل فكرتي
              </button>
            </form>
          </Card>
        ) : (
          <div className="results-container fade-in">
            <div className="results-header">
              <h2>نتائج التحليل: {results.startupName}</h2>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowResults(false);
                  setResults(null);
                }}
              >
                تحليل فكرة أخرى
              </button>
            </div>

            <div className="grid grid-cols-2 mb-xl">
              <Card className="result-card">
                <div className="result-icon-wrapper">
                  {results.feasibility === "High" ? (
                    <CheckCircle2 size={32} className="result-icon-success" />
                  ) : (
                    <AlertCircle size={32} className="result-icon-warning" />
                  )}
                </div>
                <h3>الجدوى</h3>
                <div className="result-value">
                  {results.feasibility === "High"
                    ? "عالية"
                    : results.feasibility === "Medium"
                    ? "متوسطة"
                    : "منخفضة"}
                </div>
                <p className="text-muted text-sm">
                  بناءً على اقتصاديات الوحدة وظروف السوق
                </p>
              </Card>

              <Card className="result-card">
                <div className="result-icon-wrapper">
                  <AlertCircle
                    size={32}
                    className={`result-icon-${getRiskVariant(
                      results.riskLevel
                    )}`}
                  />
                </div>
                <h3>مستوى المخاطر</h3>
                <div className="result-value">
                  <Tag variant={getRiskVariant(results.riskLevel)}>
                    {results.riskLevel === "Low"
                      ? "منخفض"
                      : results.riskLevel === "Medium"
                      ? "متوسط"
                      : "عالٍ"}
                  </Tag>
                </div>
                <p className="text-muted text-sm">
                  تقييم شامل للمخاطر لسوق ظفار
                </p>
              </Card>
            </div>

            <Card className="metrics-card mb-xl">
              <h3 className="mb-lg">اقتصاديات الوحدة (ريال عماني)</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-label">CAC المقدر</div>
                  <div className="metric-value">
                    {formatOMR(results.estimatedCAC)}
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">LTV المقدر</div>
                  <div className="metric-value">
                    {formatOMR(results.estimatedLTV)}
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">نسبة LTV/CAC</div>
                  <div className="metric-value">
                    {results.ltvCacRatio.toFixed(1)}x
                  </div>
                  <div
                    className={`metric-status ${
                      results.ltvCacRatio >= 3 ? "success" : "warning"
                    }`}
                  >
                    {results.ltvCacRatio >= 3 ? "✓ صحي" : "⚠ يحتاج تحسين"}
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-label">فترة الاسترداد</div>
                  <div className="metric-value">
                    {results.paybackMonths} شهر
                  </div>
                </div>
              </div>
            </Card>

            <Card className="recommendations-card">
              <h3 className="mb-lg">توصيات الذكاء الاصطناعي لظفار وعُمان</h3>
              <ul className="recommendations-list">
                {results.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="recommendation-item fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="next-steps">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/smart-plan")}
              >
                إنشاء الخطة الذكية
                <ArrowRight size={20} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/metrics", {
                    state: { scenarioPack, fromIdea: true },
                  })
                }
              >
                عرض مقاييس السيناريوهات
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">جاري تحليل اقتصاديات الوحدة...</p>
            <p className="loading-text">
              جاري التحقق من معايير SaaS في ظفار...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaReview;
