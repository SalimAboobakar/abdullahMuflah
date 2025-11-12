import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import "./ChatAssistant.css";

// ردود جاهزة للأسئلة الشائعة
const quickReplies = [
  "كيف أبدأ في استخدام المنصة؟",
  "ما هي الباقات المتاحة؟",
  "كيف أستخدم تحليل الفكرة؟",
  "ما هي المقاييس المتاحة؟",
];

const responses = {
  default: "مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
  greeting:
    "أهلاً وسهلاً! أنا هنا لمساعدتك في استخدام منصة Risepreneur. يمكنك طرح أي سؤال أو اختيار أحد الأسئلة السريعة أدناه.",
  "كيف أبدأ في استخدام المنصة؟":
    "لبدء استخدام المنصة:\n\n1. اختر الباقة المناسبة من صفحة الاشتراك\n2. بعد الاشتراك، ابدأ بتحليل فكرتك من صفحة 'تحليل الفكرة'\n3. أنشئ خطة ذكية من صفحة 'الخطة الذكية'\n4. تابع مقاييسك من صفحة 'المقاييس'\n5. تواصل مع المرشدين من صفحة 'المرشدون'",
  "ما هي الباقات المتاحة؟":
    "نوفر ثلاث باقات:\n\n📦 الباقة الأساسية (8 ريال/شهر):\n- تحليل فكرة واحدة شهرياً\n- خطة ذكية أساسية\n- وصول إلى 2 مرشد شهرياً\n\n⭐ الباقة المتقدمة (18 ريال/شهر):\n- تحليل أفكار غير محدود\n- خطة ذكية متقدمة مع توقعات 3 سنوات\n- وصول غير محدود للمرشدين\n\n🏢 الباقة المؤسسية (40 ريال/شهر):\n- جميع الميزات السابقة\n- مدير حساب مخصص\n- دعم 24/7\n- جلسات استشارية شهرية",
  "كيف أستخدم تحليل الفكرة؟":
    "لتحليل فكرتك:\n\n1. اذهب إلى صفحة 'تحليل الفكرة'\n2. املأ النموذج بالمعلومات التالية:\n   - اسم المنتج/الخدمة\n   - الوصف\n   - السوق المستهدف\n   - التسعير المقترح\n3. اضغط على 'تحليل الفكرة'\n4. ستحصل على:\n   - تقييم المخاطر\n   - اقتصاديات الوحدة (CAC, LTV)\n   - توصيات مخصصة لسوق ظفار",
  "ما هي المقاييس المتاحة؟":
    "نوفر مقاييس SaaS شاملة:\n\n📊 المقاييس الأساسية:\n- MRR (الإيرادات الشهرية المتكررة)\n- LTV (قيمة العميل مدى الحياة)\n- CAC (تكلفة اكتساب العميل)\n- LTV/CAC Ratio\n- معدل التسرب (Churn Rate)\n- فترة الاسترداد (Payback Period)\n\nيمكنك تتبع هذه المقاييس مع سيناريوهات متعددة (ناجح/في خطر) من صفحة 'المقاييس'",
  "كيف أتواصل مع المرشدين؟":
    "للتواصل مع المرشدين:\n\n1. اذهب إلى صفحة 'المرشدون'\n2. تصفح قائمة المرشدين المتاحين\n3. اضغط على 'تواصل' للباقة المختارة\n4. اختر التاريخ والوقت المناسبين\n5. سيتم تأكيد الحجز\n\nنوفر مرشدين متخصصين في:\n- الاستشارة المالية\n- استراتيجية النمو\n- تطوير المنتجات\n- أفضل ممارسات SaaS",
  "ما هي فترة التجربة المجانية؟":
    "جميع الباقات تشمل فترة تجريبية مجانية لمدة 14 يوماً. خلال هذه الفترة يمكنك:\n\n✅ تجربة جميع الميزات\n✅ تحليل أفكار متعددة\n✅ الوصول إلى المرشدين\n✅ إنشاء خطط ذكية\n\nيمكنك الإلغاء في أي وقت دون أي التزامات.",
  pricing:
    "يمكنك الاطلاع على جميع الباقات والأسعار من صفحة 'الاشتراك' في القائمة العلوية. جميع الباقات تشمل فترة تجريبية مجانية لمدة 14 يوماً.",
  help: "يمكنني مساعدتك في:\n\n✅ فهم كيفية استخدام المنصة\n✅ شرح الميزات والوظائف\n✅ الإجابة على الأسئلة الشائعة\n✅ توجيهك للصفحات المناسبة\n\nما الذي تريد معرفته؟",
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: responses.default,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // التحقق من الترحيب
    if (
      lowerMessage.includes("مرحبا") ||
      lowerMessage.includes("أهلا") ||
      lowerMessage.includes("السلام") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi")
    ) {
      return responses.greeting;
    }

    // البحث في الردود الجاهزة
    for (const [key, value] of Object.entries(responses)) {
      if (key !== "default" && key !== "greeting") {
        if (
          lowerMessage.includes(key.toLowerCase()) ||
          key.includes(userMessage)
        ) {
          return value;
        }
      }
    }

    // البحث بالكلمات المفتاحية
    if (
      lowerMessage.includes("باقة") ||
      lowerMessage.includes("سعر") ||
      lowerMessage.includes("اشتراك") ||
      lowerMessage.includes("pricing")
    ) {
      return responses["ما هي الباقات المتاحة؟"];
    }

    if (
      lowerMessage.includes("بدء") ||
      lowerMessage.includes("أبدأ") ||
      lowerMessage.includes("كيف أبدأ") ||
      lowerMessage.includes("start")
    ) {
      return responses["كيف أبدأ في استخدام المنصة؟"];
    }

    if (
      lowerMessage.includes("تحليل") ||
      lowerMessage.includes("فكرة") ||
      lowerMessage.includes("idea")
    ) {
      return responses["كيف أستخدم تحليل الفكرة？"];
    }

    if (
      lowerMessage.includes("مقياس") ||
      lowerMessage.includes("metric") ||
      lowerMessage.includes("mrr") ||
      lowerMessage.includes("ltv")
    ) {
      return responses["ما هي المقاييس المتاحة؟"];
    }

    if (
      lowerMessage.includes("مرشد") ||
      lowerMessage.includes("مستشار") ||
      lowerMessage.includes("mentor")
    ) {
      return responses["كيف أتواصل مع المرشدين؟"];
    }

    if (
      lowerMessage.includes("تجربة") ||
      lowerMessage.includes("مجاني") ||
      lowerMessage.includes("trial")
    ) {
      return responses["ما هي فترة التجربة المجانية؟"];
    }

    if (
      lowerMessage.includes("مساعدة") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("مساعدة")
    ) {
      return responses.help;
    }

    // رد افتراضي
    return "شكراً لسؤالك! يمكنني مساعدتك في:\n\n• كيفية استخدام المنصة\n• الباقات والأسعار\n• تحليل الأفكار\n• المقاييس والتقارير\n• التواصل مع المرشدين\n\nيرجى اختيار أحد الأسئلة السريعة أدناه أو اطرح سؤالك بشكل أكثر تحديداً.";
  };

  const handleSendMessage = (text = null) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // إضافة رسالة المستخدم
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // محاكاة كتابة البوت
    setTimeout(() => {
      const botResponse = findResponse(messageText);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-assistant-button ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        aria-label="فتح المساعد الذكي"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-assistant-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-avatar">
                <Bot size={20} />
              </div>
              <div className="chat-header-text">
                <h3>المساعد الذكي</h3>
                <p>متصل الآن</p>
              </div>
            </div>
            <button className="chat-close-button" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.sender === "user" ? "user" : "bot"
                }`}
              >
                <div className="message-avatar">
                  {message.sender === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < message.text.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message bot typing">
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="quick-replies">
              <p className="quick-replies-title">أسئلة سريعة:</p>
              <div className="quick-replies-buttons">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-button"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="اكتب رسالتك هنا..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chat-send-button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
