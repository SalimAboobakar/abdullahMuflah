import { useNavigate } from "react-router-dom";
import { Check, X, Star } from "lucide-react";
import Card from "../components/common/Card";
import { subscriptionPlans } from "../data/mockData";
import { formatOMR } from "../utils/calculations";
import "./Pricing.css";

const Pricing = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    // Navigate to checkout page with plan ID
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <div className="pricing-page">
      <div className="container">
        <div className="page-header">
          <h1>اختر الباقة المناسبة لك</h1>
          <p className="page-description">
            اختر الباقة التي تناسب احتياجاتك وابدأ رحلتك في بناء مشروعك الناجح
          </p>
          <p className="prototype-label">بيانات تجريبية - نموذج أمامي</p>
        </div>

        <div className="pricing-grid">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`pricing-card ${
                plan.popular ? "popular" : ""
              } fade-in`}
              style={{ animationDelay: `${plan.id * 100}ms` }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Star size={16} />
                  الأكثر شعبية
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-pricing">
                <div className="price">
                  <span className="price-amount">{formatOMR(plan.price)}</span>
                  <span className="price-period">/{plan.period}</span>
                </div>
              </div>

              <div className="plan-features">
                <h4 className="features-title">المميزات:</h4>
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <Check size={18} className="feature-icon check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="limitations-title">القيود:</h4>
                    <ul className="limitations-list">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="limitation-item">
                          <X size={18} className="feature-icon cross" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <button
                className={`btn btn-primary btn-lg plan-button ${
                  plan.popular ? "btn-popular" : ""
                }`}
                onClick={() => handleSubscribe(plan.id)}
                style={
                  plan.popular
                    ? {
                        background: `linear-gradient(135deg, ${plan.color}, var(--accent-cyan))`,
                      }
                    : {}
                }
              >
                اشترك الآن
              </button>
            </Card>
          ))}
        </div>

        <div className="pricing-footer">
          <p className="footer-note">
            جميع الباقات تشمل فترة تجريبية مجانية لمدة 14 يوماً. يمكنك الإلغاء
            في أي وقت.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
