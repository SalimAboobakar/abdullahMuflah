import { useState } from "react";
import {
  X,
  FileText,
  Download,
  DollarSign,
  TrendingUp,
  Code,
  Award,
} from "lucide-react";
import Card from "../components/common/Card";
import { mentors, deckTemplate, successfulScenario } from "../data/mockData";
import { formatOMR } from "../utils/calculations";
import "./MentorsAndDeck.css";

// Icon mapping
const iconMap = {
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
  Code: Code,
  Award: Award,
};

const MentorsAndDeck = () => {
  const [showDeckModal, setShowDeckModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDeck = async () => {
    setIsGenerating(true);

    // Simulate deck generation (in production, this would be an API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsGenerating(false);
    setShowDeckModal(true);
  };

  const handleCloseDeck = () => {
    setShowDeckModal(false);
  };

  // Populate traction slide with current scenario data
  const tractionContent = `
    • ${
      successfulScenario.monthlyData[11].customers
    } active customers after 12 months
    • MRR: ${formatOMR(successfulScenario.monthlyData[11].mrr)}
    • LTV/CAC ratio: ${successfulScenario.metrics.ltvCacRatio}x (healthy)
    • Avg churn: ${successfulScenario.metrics.avgChurn}% (industry-leading)
  `;

  const financialContent = `
    Year 1 (Current):
    • 58 customers, ${formatOMR(3045)} MRR
    • ARR: ${formatOMR(36540)}
    • Profit margin: 34.3%
    
    Year 2 Projection:
    • 142 customers, ${formatOMR(7455)} MRR
    • ARR: ${formatOMR(89460)}
    • Profit margin: 49.7%
    
    Year 3 Projection:
    • 285 customers, ${formatOMR(14963)} MRR
    • ARR: ${formatOMR(179550)}
    • Profit margin: 58.2%
  `;

  return (
    <div className="mentors-deck">
      <div className="container">
        <div className="page-header">
          <h1>المرشدون وعرض المستثمرين</h1>
          <p className="page-description">
            تواصل مع مرشدين ذوي خبرة وأنشئ عروضاً جاهزة للمستثمرين بنقرة واحدة.
          </p>
          <p className="prototype-label">بيانات تجريبية - نموذج أمامي</p>
        </div>

        {/* Mentors Section */}
        <section className="mentors-section">
          <h2 className="section-title">المرشدون الخبراء</h2>
          <p className="section-subtitle">
            احصل على التوجيه من محترفين متمرسين ذوي خبرة عميقة في SaaS وسوق دول
            مجلس التعاون.
          </p>

          <div className="grid grid-cols-4">
            {mentors.map((mentor) => {
              const IconComponent = iconMap[mentor.icon];
              return (
                <Card
                  key={mentor.id}
                  className="mentor-card fade-in"
                  style={{ animationDelay: `${mentor.id * 50}ms` }}
                >
                  <div className="mentor-avatar">
                    <IconComponent size={40} strokeWidth={2} />
                  </div>
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <p className="mentor-role">{mentor.role}</p>
                  <p className="mentor-focus">{mentor.focus}</p>
                  <div className="mentor-expertise">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="expertise-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="btn btn-outline btn-sm">تواصل</button>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="divider"></div>

        {/* Investor Deck Section */}
        <section className="deck-section">
          <h2 className="section-title">منشئ عرض المستثمرين</h2>
          <p className="section-subtitle">
            أنشئ عرضاً احترافياً للمستثمرين معبأ مسبقاً بمقاييس ورؤى SaaS الخاصة
            بك.
          </p>

          <Card className="deck-generator-card">
            <div className="deck-generator-content">
              <div className="deck-icon-wrapper">
                <FileText size={64} className="deck-icon" />
              </div>
              <h3>عرض المستثمرين بنقرة واحدة</h3>
              <p className="deck-description">
                املأ عرضاً احترافياً تلقائياً بمقاييسك الحالية والتوقعات وتحليل
                السوق المصمم للمستثمرين العمانيين.
              </p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleGenerateDeck}
                disabled={isGenerating}
              >
                {isGenerating ? "جاري الإنشاء..." : "إنشاء عرض المستثمرين"}
              </button>
            </div>
          </Card>
        </section>

        {/* Deck Modal */}
        {showDeckModal && (
          <div className="modal-backdrop" onClick={handleCloseDeck}>
            <div
              className="modal-content deck-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>معاينة عرض المستثمرين</h2>
                <button className="modal-close" onClick={handleCloseDeck}>
                  <X size={24} />
                </button>
              </div>

              <div className="deck-slides">
                {deckTemplate.slides.map((slide, index) => {
                  let content = slide.content;

                  // Dynamically fill traction and financial slides
                  if (slide.title === "الجذب") {
                    content = tractionContent;
                  } else if (slide.title === "البيانات المالية البارزة") {
                    content = financialContent;
                  }

                  return (
                    <div
                      key={index}
                      className="deck-slide fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="slide-number">شريحة {index + 1}</div>
                      <h3 className="slide-title">{slide.title}</h3>
                      <div className="slide-content">
                        {content ? (
                          <pre className="slide-text">{content}</pre>
                        ) : (
                          <p className="slide-placeholder">
                            سيتم ملء المحتوى بناءً على بياناتك
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="modal-footer">
                <button className="btn btn-outline" onClick={handleCloseDeck}>
                  إغلاق
                </button>
                <button className="btn btn-primary">
                  <Download size={18} />
                  تصدير كـ PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p className="loading-text">جاري إنشاء عرض المستثمرين...</p>
            <p className="loading-text">جاري ملء العرض بمقاييسك...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsAndDeck;
