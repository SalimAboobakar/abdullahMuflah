import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, BarChart3, Users } from "lucide-react";
import Card from "../components/common/Card";
import JourneyFlow from "../components/flow/JourneyFlow";
import logo from "../assets/logo.jpeg";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles size={32} />,
      title: "التحليل الذكي بالذكاء الاصطناعي",
      description:
        "احصل على تحليل فوري لفكرتك مع تقييم المخاطر واقتصاديات الوحدة المخصصة لسوق ظفار.",
      color: "teal",
    },
    {
      icon: <FileText size={32} />,
      title: "منشئ الخطة الذكية",
      description:
        "تحليل SWOT تلقائي ونموذج الأعمال التجارية والتوقعات المالية المخصصة لعُمان.",
      color: "cyan",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "مقاييس SaaS المباشرة",
      description:
        "راقب MRR و LTV و CAC ومعدل التسرب مع سيناريوهات فورية توضح الحالات الصحية والمعرضة للخطر.",
      color: "teal",
    },
    {
      icon: <Users size={32} />,
      title: "المرشدون وعرض المستثمرين",
      description:
        "تواصل مع مرشدين من دول مجلس التعاون وأنشئ عروضاً جاهزة للمستثمرين بنقرة واحدة.",
      color: "cyan",
    },
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <img src={logo} alt="Risepreneur" className="hero-logo" />
            <h1 className="hero-title">Risepreneur</h1>
            <p className="hero-subtitle">
              نظام متكامل لرواد الأعمال في ظفار وعُمان
            </p>
            <p className="hero-description">
              منصة ذكية مدعومة بالذكاء الاصطناعي للتحقق من صحة فكرتك وتخطيطها
              وتوسيع نطاق شركتك الناشئة بأفكار ذكية للسوق العماني.
            </p>
            <div className="hero-ctas">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/idea-review")}
              >
                ابدأ التحليل الذكي
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/metrics")}
              >
                عرض السيناريوهات المباشرة
              </button>
            </div>
            <p className="prototype-label mt-md">
              نموذج تجريبي - تحليل محاكى بالذكاء الاصطناعي
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">كل ما تحتاجه لإطلاق مشروعك بذكاء</h2>
          <div className="grid grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`feature-icon feature-icon-${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Flow */}
      <section className="journey-section">
        <div className="container">
          <JourneyFlow />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">هل أنت مستعد لبناء شركتك في ظفار؟</h2>
            <p className="cta-description">
              انضم إلى الجيل القادم من رواد الأعمال العمانيين الذين يبنون أعمال
              SaaS مستدامة ومدفوعة بالبيانات.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/idea-review")}
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
