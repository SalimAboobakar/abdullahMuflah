import { useState } from "react";
import {
  X,
  FileText,
  Download,
  DollarSign,
  TrendingUp,
  Code,
  Award,
  ChevronRight,
  ChevronLeft,
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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

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

  const openBooking = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
    setSelectedDate(null);
    setSelectedTime("");
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    setCurrentMonth(startOfMonth);
  };

  const closeBooking = () => {
    setShowBookingModal(false);
    setSelectedMentor(null);
    setSelectedDate(null);
    setSelectedTime("");
  };

  const monthNamesAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const weekdayNamesAr = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const formatMonthYear = (date) =>
    `${monthNamesAr[date.getMonth()]} ${date.getFullYear()}`;

  const toISODate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const getMonthGrid = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay(); // 0 (Sun) - 6 (Sat)

    const cells = [];
    // Leading empty days
    for (let i = 0; i < startWeekday; i++) {
      cells.push(null);
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d));
    }
    // Trailing to complete rows (multiple of 7)
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const trailing = 7 - remainder;
      for (let i = 1; i <= trailing; i++) {
        cells.push(null);
      }
    }
    return cells;
  };

  const prevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
    setSelectedDate(null);
    setSelectedTime("");
  };

  const nextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
    setSelectedDate(null);
    setSelectedTime("");
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

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
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => openBooking(mentor)}
                  >
                    تواصل
                  </button>
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

        {/* Booking Modal */}
        {showBookingModal && selectedMentor && (
          <div className="modal-backdrop" onClick={closeBooking}>
            <div
              className="modal-content booking-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>حجز موعد مع {selectedMentor.name}</h2>
                <button className="modal-close" onClick={closeBooking}>
                  <X size={24} />
                </button>
              </div>

              <div className="booking-body">
                <div className="calendar">
                  <div className="calendar-header">
                    <button
                      className="calendar-nav"
                      onClick={prevMonth}
                      aria-label="الشهر السابق"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <div className="calendar-title">
                      {formatMonthYear(currentMonth)}
                    </div>
                    <button
                      className="calendar-nav"
                      onClick={nextMonth}
                      aria-label="الشهر التالي"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  </div>
                  <div className="calendar-weekdays">
                    {weekdayNamesAr.map((d, i) => (
                      <div className="calendar-weekday" key={i}>
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="calendar-grid">
                    {getMonthGrid(currentMonth).map((cellDate, idx) => {
                      if (!cellDate) {
                        return (
                          <div className="calendar-cell empty" key={idx} />
                        );
                      }
                      const iso = toISODate(cellDate);
                      const unavailable =
                        selectedMentor?.unavailableDates?.includes(iso) ||
                        false;
                      const isPast = cellDate < now;
                      const isSelected = isSameDay(cellDate, selectedDate);
                      const disabled = unavailable || isPast;
                      return (
                        <button
                          key={idx}
                          className={`calendar-cell day ${
                            disabled ? "disabled" : ""
                          } ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            if (!disabled) {
                              setSelectedDate(cellDate);
                              setSelectedTime("");
                            }
                          }}
                          disabled={disabled}
                          aria-label={iso}
                          title={
                            unavailable ? "غير متاح" : isPast ? "انتهى" : iso
                          }
                        >
                          {cellDate.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="times-wrapper">
                  <h3 className="times-title">اختر التوقيت</h3>
                  {!selectedDate ? (
                    <p className="text-muted">يرجى اختيار يوم أولاً</p>
                  ) : (
                    <div className="time-slots">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          className={`time-slot ${
                            selectedTime === t ? "selected" : ""
                          }`}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-outline" onClick={closeBooking}>
                  إلغاء
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => {
                    // In production, send booking to backend
                    const iso = selectedDate ? toISODate(selectedDate) : "";
                    alert(
                      `تم تأكيد الحجز مع ${selectedMentor.name} يوم ${iso} الساعة ${selectedTime}`
                    );
                    closeBooking();
                  }}
                >
                  تأكيد الحجز
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsAndDeck;
