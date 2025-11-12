import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, CreditCard, Lock, CheckCircle, X } from "lucide-react";
import Card from "../components/common/Card";
import { subscriptionPlans } from "../data/mockData";
import { formatOMR } from "../utils/calculations";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = parseInt(searchParams.get("plan")) || 1;
  const selectedPlan =
    subscriptionPlans.find((p) => p.id === planId) || subscriptionPlans[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If no plan selected, redirect to pricing
    if (!planId || !selectedPlan) {
      navigate("/pricing");
    }
  }, [planId, selectedPlan, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "رقم البطاقة مطلوب";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "رقم البطاقة يجب أن يكون 16 رقم";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "تاريخ الانتهاء مطلوب";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "التنسيق يجب أن يكون MM/YY";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV مطلوب";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV يجب أن يكون 3 أو 4 أرقام";
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "اسم حامل البطاقة مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  const handleCloseModal = () => {
    setPaymentSuccess(false);
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <button className="back-button" onClick={() => navigate("/pricing")}>
            <ArrowRight size={20} />
            العودة إلى الباقات
          </button>
          <h1>إتمام عملية الدفع</h1>
          <p className="checkout-subtitle">أكمل بياناتك لإتمام الاشتراك</p>
        </div>

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="checkout-sidebar">
            <Card className="order-summary">
              <h3 className="summary-title">ملخص الطلب</h3>
              <div className="summary-plan">
                <div className="plan-info">
                  <h4>{selectedPlan.name}</h4>
                  <p>{selectedPlan.description}</p>
                </div>
                <div className="plan-price">
                  <span className="price-label">السعر:</span>
                  <span className="price-value">
                    {formatOMR(selectedPlan.price)}
                  </span>
                  <span className="price-period">/{selectedPlan.period}</span>
                </div>
              </div>

              <div className="summary-features">
                <h4>المميزات:</h4>
                <ul>
                  {selectedPlan.features.slice(0, 5).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  {selectedPlan.features.length > 5 && (
                    <li className="more-features">
                      +{selectedPlan.features.length - 5} ميزة أخرى
                    </li>
                  )}
                </ul>
              </div>

              <div className="summary-total">
                <div className="total-row">
                  <span>المجموع:</span>
                  <span className="total-amount">
                    {formatOMR(selectedPlan.price)}
                  </span>
                </div>
                <p className="trial-note">فترة تجريبية مجانية لمدة 14 يوماً</p>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="checkout-form-wrapper">
            <Card className="payment-form-card">
              <div className="form-header">
                <CreditCard size={24} />
                <h3>معلومات الدفع</h3>
              </div>

              <form onSubmit={handleSubmit} className="payment-form">
                {/* Personal Information */}
                <div className="form-section">
                  <h4 className="section-title">المعلومات الشخصية</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">الاسم الكامل *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "error" : ""}
                        placeholder="أدخل اسمك الكامل"
                      />
                      {errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "error" : ""}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">رقم الهاتف *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "error" : ""}
                        placeholder="+968 XXXX XXXX"
                      />
                      {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="form-section">
                  <h4 className="section-title">معلومات البطاقة</h4>
                  <div className="form-group">
                    <label htmlFor="cardNumber">رقم البطاقة *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          cardNumber: formatted,
                        }));
                        if (errors.cardNumber) {
                          setErrors((prev) => ({ ...prev, cardNumber: "" }));
                        }
                      }}
                      className={errors.cardNumber ? "error" : ""}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && (
                      <span className="error-message">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardName">اسم حامل البطاقة *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={errors.cardName ? "error" : ""}
                      placeholder="كما هو مكتوب على البطاقة"
                    />
                    {errors.cardName && (
                      <span className="error-message">{errors.cardName}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">تاريخ الانتهاء *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            expiryDate: formatted,
                          }));
                          if (errors.expiryDate) {
                            setErrors((prev) => ({ ...prev, expiryDate: "" }));
                          }
                        }}
                        className={errors.expiryDate ? "error" : ""}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <span className="error-message">
                          {errors.expiryDate}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "");
                          setFormData((prev) => ({ ...prev, cvv: v }));
                          if (errors.cvv) {
                            setErrors((prev) => ({ ...prev, cvv: "" }));
                          }
                        }}
                        className={errors.cvv ? "error" : ""}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && (
                        <span className="error-message">{errors.cvv}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="security-note">
                  <Lock size={16} />
                  <span>جميع المعاملات مشفرة وآمنة</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg submit-button"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? "جاري المعالجة..."
                    : `ادفع ${formatOMR(selectedPlan.price)}`}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {paymentSuccess && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal-content success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            <div className="success-content">
              <CheckCircle size={64} className="success-icon" />
              <h2>تمت عملية الدفع</h2>
              <p>شكراً لك على الاشتراك في {selectedPlan.name}</p>
              <p className="success-note">
                سيتم إرسال تفاصيل الاشتراك إلى بريدك الإلكتروني قريباً
              </p>
              <button
                className="btn btn-primary btn-lg modal-button"
                onClick={handleCloseModal}
              >
                العودة إلى الصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
