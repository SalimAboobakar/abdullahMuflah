// Mock data for scenarios
// In production, this would come from backend APIs

/**
 * Scenario 1: Successful SaaS - Maintenance & Operations Management for Dhofar B2B
 * Target: Hotels, farms, warehouses in Dhofar region
 */
export const successfulScenario = {
  name: "OpsFlow - نظام الصيانة",
  description:
    "نظام SaaS للشركات لإدارة الصيانة والعمليات للفنادق والمزارع والمستودعات في ظفار",
  region: "ظفار، عُمان",

  // 12-month data
  monthlyData: [
    { month: 1, customers: 6, mrr: 310, churn: 0, newCustomers: 6 },
    { month: 2, customers: 10, mrr: 520, churn: 0, newCustomers: 4 },
    { month: 3, customers: 14, mrr: 735, churn: 2.5, newCustomers: 4 },
    { month: 4, customers: 19, mrr: 998, churn: 2.8, newCustomers: 5 },
    { month: 5, customers: 24, mrr: 1260, churn: 3.1, newCustomers: 5 },
    { month: 6, customers: 29, mrr: 1523, churn: 2.5, newCustomers: 5 },
    { month: 7, customers: 35, mrr: 1838, churn: 2.9, newCustomers: 6 },
    { month: 8, customers: 40, mrr: 2100, churn: 3.3, newCustomers: 5 },
    { month: 9, customers: 46, mrr: 2415, churn: 2.7, newCustomers: 6 },
    { month: 10, customers: 51, mrr: 2678, churn: 3.5, newCustomers: 5 },
    { month: 11, customers: 56, mrr: 2940, churn: 2.2, newCustomers: 5 },
    { month: 12, customers: 58, mrr: 3045, churn: 4.0, newCustomers: 2 },
  ],

  // Key metrics
  metrics: {
    arpa: 52.5, // OMR per month
    cac: 18, // OMR
    ltv: 708, // OMR (52.5 * 0.75 * 18 months)
    ltvCacRatio: 3.9,
    avgChurn: 2.8, // %
    grossMargin: 75, // %
    paybackPeriod: 3.6, // months
  },

  insights: [
    "مسار نمو مستدام لقطاع B2B في ظفار",
    "اقتصاديات الوحدة تدعم التوسع إلى مسقط بعد الشهر 12",
    "معدل التسرب المنخفض يشير إلى توافق قوي بين المنتج والسوق في قطاعي الضيافة والزراعة",
    "التسعير متوافق مع ميزانيات الشركات الصغيرة والمتوسطة في ظفار (30-80 ريال عماني/شهر)",
  ],

  status: "healthy",
};

/**
 * Scenario 2: At-Risk SaaS - Unfocused local experiences booking
 * No clear positioning or value proposition
 */
export const atRiskScenario = {
  name: "LocalXP - حجز التجارب",
  description:
    "نظام SaaS لحجز تجارب محلية عشوائية بدون تركيز واضح أو قيمة مضافة محددة",
  region: "ظفار، عُمان",

  // 12-month data showing stagnation and high churn
  monthlyData: [
    { month: 1, customers: 15, mrr: 285, churn: 0, newCustomers: 15 },
    { month: 2, customers: 18, mrr: 342, churn: 11, newCustomers: 3 },
    { month: 3, customers: 19, mrr: 361, churn: 16, newCustomers: 1 },
    { month: 4, customers: 17, mrr: 323, churn: 18, newCustomers: -2 },
    { month: 5, customers: 20, mrr: 380, churn: 15, newCustomers: 3 },
    { month: 6, customers: 18, mrr: 342, churn: 20, newCustomers: -2 },
    { month: 7, customers: 21, mrr: 399, churn: 14, newCustomers: 3 },
    { month: 8, customers: 19, mrr: 361, churn: 19, newCustomers: -2 },
    { month: 9, customers: 22, mrr: 418, churn: 13, newCustomers: 3 },
    { month: 10, customers: 20, mrr: 380, churn: 22, newCustomers: -2 },
    { month: 11, customers: 23, mrr: 437, churn: 15, newCustomers: 3 },
    { month: 12, customers: 21, mrr: 399, churn: 17, newCustomers: -2 },
  ],

  // Weak metrics
  metrics: {
    arpa: 19, // OMR per month - too low
    cac: 28, // OMR - too high relative to ARPA
    ltv: 85.5, // OMR (19 * 0.75 * 6 months - short lifetime)
    ltvCacRatio: 1.3, // Red flag: < 3
    avgChurn: 16.5, // % - very high
    grossMargin: 75, // %
    paybackPeriod: 7.8, // months - too long
  },

  insights: [
    "⚠ في خطر: عدم توافق في تحديد الموقع والتسعير والشريحة المستهدفة",
    "⚠ معدل التسرب المرتفع (16.5٪) يشير إلى ضعف التوافق بين المنتج والسوق",
    "⚠ نسبة LTV/CAC البالغة 1.3 تجعل العمل غير مستدام",
    "يتطلب تغيير استراتيجي: قيمة مضافة أوضح أو استراتيجية لتقليل التكاليف",
    "فكر في التركيز على قطاع معين (السياحة، الضيافة، أو التعليم) بدلاً من التجارب الواسعة",
  ],

  status: "at-risk",
};

/**
 * SWOT Analysis for Dhofar B2B SaaS
 */
export const swotData = {
  strengths: [
    "ميزة الريادة في منطقة ظفار لأنظمة SaaS التشغيلية",
    "منافسة أقل مقارنة بمسقط",
    "القرب من العملاء يتيح بناء علاقات شخصية",
    "دعم حكومي للتحول الرقمي في الشركات الصغيرة والمتوسطة",
  ],
  weaknesses: [
    "حجم سوق أصغر مقارنة بمسقط أو دول مجلس التعاون",
    "محدودية الكفاءات التقنية المحلية",
    "معدل اعتماد أبطأ لأنظمة SaaS في القطاعات التقليدية",
    "الاعتماد على الظروف الاقتصادية المحلية (السياحة، الزراعة)",
  ],
  opportunities: [
    "توسع قطاع السياحة في صلالة يخلق طلباً متزايداً",
    "تركيز رؤية 2040 على الاقتصاد الرقمي",
    "إمكانية التوسع إلى مسقط وأسواق مجلس التعاون الأخرى",
    "نمو النظام البيئي للشركات الصغيرة والمتوسطة مع شركات ناشئة وحاضنات جديدة",
  ],
  threats: [
    "دخول شركات SaaS عالمية إلى السوق العماني",
    "التقلبات الاقتصادية التي تؤثر على ميزانيات الشركات الصغيرة والمتوسطة",
    "بطء اتصال الإنترنت في المناطق الريفية",
    "التفضيل الثقافي للحلول الشخصية على الحلول الرقمية",
  ],
};

/**
 * Business Model Canvas for Dhofar SaaS
 */
export const businessModelCanvas = {
  customerSegments: {
    label: "شرائح العملاء",
    items: [
      "الشركات الصغيرة والمتوسطة في ظفار (فنادق، مزارع، مستودعات)",
      "مشغلو السياحة في صلالة",
      "أعمال الزراعة",
      "شركات الخدمات اللوجستية",
    ],
  },
  valuePropositions: {
    label: "القيمة المضافة",
    items: [
      "تبسيط العمليات وتتبع الصيانة",
      "تقليل التكاليف من خلال الأتمتة",
      "واجهة عربية + إنجليزية",
      "دعم وتدريب محلي",
    ],
  },
  channels: {
    label: "القنوات",
    items: [
      "المبيعات المباشرة من خلال غرفة تجارة وصناعة صلالة",
      "شراكات مع الحاضنات المحلية",
      "التسويق الإلكتروني (LinkedIn، المنتديات المحلية)",
      "برنامج الإحالة من العملاء الحاليين",
    ],
  },
  customerRelationships: {
    label: "علاقات العملاء",
    items: [
      "مساعدة شخصية للتأهيل",
      "مدير حساب مخصص للمؤسسات",
      "بوابة الخدمة الذاتية عبر الإنترنت",
      "دعم واتساب (المفضل في عُمان)",
    ],
  },
  revenueStreams: {
    label: "مصادر الإيرادات",
    items: [
      "اشتراك شهري (30-80 ريال عماني)",
      "خطط سنوية (خصم 10٪)",
      "حزم مخصصة للمؤسسات",
      "رسوم التنفيذ والتدريب",
    ],
  },
  keyResources: {
    label: "الموارد الأساسية",
    items: [
      "فريق التطوير (عن بُعد + محلي)",
      "ممثل مبيعات محلي في صلالة",
      "بنية تحتية سحابية (AWS منطقة البحرين)",
      "شراكة مع صندوق عُمان للتقنية",
    ],
  },
  keyActivities: {
    label: "الأنشطة الأساسية",
    items: [
      "تطوير وصيانة المنتج",
      "نجاح العملاء والدعم",
      "التسويق والشراكات المحلية",
      "الامتثال للوائح البيانات في عُمان",
    ],
  },
  keyPartners: {
    label: "الشركاء الأساسيون",
    items: [
      "غرفة تجارة وصناعة صلالة",
      "ريادة (هيئة تنمية المشاريع الصغيرة والمتوسطة)",
      "مساحات العمل المشترك المحلية",
      "مزودو بوابات الدفع (ثواني، OmanNet)",
    ],
  },
  costStructure: {
    label: "هيكل التكاليف",
    items: [
      "رواتب فريق التطوير",
      "الاستضافة السحابية والبنية التحتية",
      "نفقات التسويق والمبيعات",
      "مساحة المكتب في صلالة",
      "الشؤون القانونية والامتثال",
    ],
  },
};

/**
 * 3-year financial projection for Dhofar SaaS (OMR)
 */
export const financialProjection = {
  year1: {
    year: 1,
    customers: 58,
    mrr: 3045,
    arr: 36540,
    revenue: 36540,
    costs: 24000,
    profit: 12540,
    profitMargin: 34.3,
  },
  year2: {
    year: 2,
    customers: 142,
    mrr: 7455,
    arr: 89460,
    revenue: 89460,
    costs: 45000,
    profit: 44460,
    profitMargin: 49.7,
  },
  year3: {
    year: 3,
    customers: 285,
    mrr: 14963,
    arr: 179550,
    revenue: 179550,
    costs: 75000,
    profit: 104550,
    profitMargin: 58.2,
  },
};

/**
 * Mock mentor data
 */
export const mentors = [
  {
    id: 1,
    name: "د. أحمد البلوشي",
    role: "مستشار مالي SaaS",
    focus: "اقتصاديات الوحدة والتمويل - عُمان",
    icon: "DollarSign",
    expertise: ["النمذجة المالية", "علاقات المستثمرين", "مقاييس SaaS"],
    unavailableDates: [
      // نوفمبر 2025
      "2025-11-13",
      "2025-11-15",
      "2025-11-18",
      "2025-11-25",
      // ديسمبر 2025
      "2025-12-02",
      "2025-12-10",
      "2025-12-20",
    ],
  },
  {
    id: 2,
    name: "فاطمة الشنفرية",
    role: "استراتيجية النمو الخليجي",
    focus: "التوسع السوقي - منطقة مجلس التعاون",
    icon: "TrendingUp",
    expertise: ["الدخول إلى السوق", "التوسع الإقليمي", "الشراكات"],
    unavailableDates: [
      "2025-11-14",
      "2025-11-19",
      "2025-11-21",
      "2025-11-28",
      "2025-12-05",
      "2025-12-12",
      "2025-12-26",
    ],
  },
  {
    id: 3,
    name: "عمر الرواس",
    role: "قائد المنتج والتقنية",
    focus: "تطوير منتجات SaaS",
    icon: "Code",
    expertise: [
      "استراتيجية المنتج",
      "الهندسة المعمارية التقنية",
      "بناء الفريق",
    ],
    unavailableDates: [
      "2025-11-16",
      "2025-11-17",
      "2025-11-24",
      "2025-11-29",
      "2025-12-03",
      "2025-12-17",
      "2025-12-24",
    ],
  },
  {
    id: 4,
    name: "سارة ميتشل",
    role: "خبيرة SaaS دولية",
    focus: "أفضل ممارسات B2B SaaS",
    icon: "Award",
    expertise: ["نجاح العملاء", "تقليل التسرب", "استراتيجية التسعير"],
    unavailableDates: [
      "2025-11-12",
      "2025-11-20",
      "2025-11-23",
      "2025-11-30",
      "2025-12-01",
      "2025-12-08",
      "2025-12-22",
    ],
  },
  {
    id: 5,
    name: "هدئ العجيلي",
    role: "مستشار أعمال وتطوير",
    focus: "استراتيجية الأعمال والتسويق - عُمان",
    icon: "TrendingUp",
    expertise: [
      "استراتيجية الأعمال",
      "التسويق الرقمي",
      "بناء العلامة التجارية",
    ],
    unavailableDates: [
      "2025-11-10",
      "2025-11-22",
      "2025-11-26",
      "2025-12-04",
      "2025-12-11",
      "2025-12-18",
      "2025-12-25",
    ],
  },
  {
    id: 6,
    name: "عماد عبيدون",
    role: "خبير تقني وابتكار",
    focus: "التقنيات الناشئة والابتكار - منطقة الخليج",
    icon: "Code",
    expertise: [
      "الابتكار التقني",
      "الحلول السحابية",
      "الأتمتة والذكاء الاصطناعي",
    ],
    unavailableDates: [
      "2025-11-11",
      "2025-11-27",
      "2025-12-06",
      "2025-12-09",
      "2025-12-15",
      "2025-12-21",
      "2025-12-28",
    ],
  },
];

/**
 * Investor deck template
 */
export const deckTemplate = {
  slides: [
    {
      title: "المشكلة",
      content:
        "تعاني الشركات الصغيرة والمتوسطة في ظفار من إدارة العمليات اليدوية، مما يؤدي إلى عدم الكفاءة وفقدان الإيرادات.",
    },
    {
      title: "الحل",
      content:
        "منصة SaaS سحابية تبسط الصيانة وتتبع العمليات والتعاون الجماعي للشركات المحلية.",
    },
    {
      title: "الفرصة السوقية",
      content:
        "أكثر من 800 شركة صغيرة ومتوسطة في منطقة ظفار (فنادق، مزارع، خدمات لوجستية) + إمكانية التوسع إلى أكثر من 15,000 شركة في عموم عُمان.",
    },
    {
      title: "الجذب",
      content: null, // Will be filled dynamically from scenario data
    },
    {
      title: "نموذج الأعمال",
      content:
        "قائم على الاشتراك: 30-80 ريال عماني/شهر لكل عميل. هدف ARPA: 52 ريال عماني مع هامش ربح إجمالي 75٪.",
    },
    {
      title: "البيانات المالية البارزة",
      content: null, // Will be filled dynamically from scenario data
    },
    {
      title: "استراتيجية الدخول للسوق",
      content:
        "شراكات مع غرفة تجارة وصناعة صلالة، ريادة، الحاضنات المحلية. مبيعات مباشرة + برنامج إحالة.",
    },
    {
      title: "الميزة التنافسية",
      content:
        "الريادة في ظفار، الدعم المحلي، واجهة عربية، فهم عميق لاحتياجات الأعمال الإقليمية.",
    },
    {
      title: "الفريق",
      content:
        "مؤسسون من ذوي الخبرة في البرمجيات والعمليات والمشهد التجاري العماني.",
    },
    {
      title: "طلب التمويل",
      content:
        "نسعى للحصول على 150,000 ريال عماني لتسريع النمو في ظفار والتوسع إلى مسقط بحلول السنة الثانية.",
    },
  ],
};

/**
 * Subscription plans data
 */
export const subscriptionPlans = [
  {
    id: 1,
    name: "الباقة الأساسية",
    nameEn: "Basic",
    price: 8,
    period: "شهري",
    description: "مثالية للشركات الناشئة والفرق الصغيرة",
    features: [
      "تحليل فكرة واحدة شهرياً",
      "خطة ذكية أساسية (SWOT + BMC)",
      "تتبع المقاييس الأساسية",
      "وصول إلى 2 مرشد شهرياً",
      "دعم عبر البريد الإلكتروني",
      "توليد عرض مستثمرين أساسي",
    ],
    limitations: [
      "حد أقصى 5 مشاريع نشطة",
      "تقارير شهرية فقط",
      "لا يوجد دعم مخصص",
    ],
    popular: false,
    color: "var(--accent-cyan)",
  },
  {
    id: 2,
    name: "الباقة المتقدمة",
    nameEn: "Professional",
    price: 18,
    period: "شهري",
    description: "للشركات المتوسطة التي تحتاج إلى ميزات متقدمة",
    features: [
      "تحليل أفكار غير محدود",
      "خطة ذكية متقدمة مع توقعات مالية 3 سنوات",
      "مقاييس متقدمة مع سيناريوهات متعددة",
      "وصول غير محدود إلى جميع المرشدين",
      "دعم أولوية عبر البريد والواتساب",
      "توليد عروض مستثمرين متقدمة",
      "تصدير PDF للتقارير",
      "إشعارات تلقائية للمقاييس",
    ],
    limitations: ["حد أقصى 15 مشروع نشط", "لا يوجد مدير حساب مخصص"],
    popular: true,
    color: "var(--accent-teal)",
  },
  {
    id: 3,
    name: "الباقة المؤسسية",
    nameEn: "Enterprise",
    price: 40,
    period: "شهري",
    description: "للشركات الكبيرة التي تحتاج إلى حلول مخصصة",
    features: [
      "جميع ميزات الباقة المتقدمة",
      "مشاريع غير محدودة",
      "مدير حساب مخصص",
      "دعم 24/7 مع استجابة فورية",
      "جلسات استشارية شهرية مع المرشدين",
      "تقارير مخصصة وتكامل API",
      "تدريب فريق مخصص",
      "أولوية في الميزات الجديدة",
      "تحليلات متقدمة وتقارير تنفيذية",
      "إدارة فرق متعددة",
    ],
    limitations: [],
    popular: false,
    color: "var(--accent-teal)",
  },
];
