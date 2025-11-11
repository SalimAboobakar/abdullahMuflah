// Calculations for SaaS metrics
// These formulas can be replaced with real API calls in production

/**
 * Calculate Customer Acquisition Cost (CAC)
 * @param {number} marketingSpend - Total marketing and sales spend
 * @param {number} newCustomers - Number of new customers acquired
 * @returns {number} CAC in OMR
 */
export const calculateCAC = (marketingSpend, newCustomers) => {
  if (newCustomers === 0) return 0;
  return marketingSpend / newCustomers;
};

/**
 * Calculate Lifetime Value (LTV)
 * @param {number} arpa - Average Revenue Per Account (monthly)
 * @param {number} grossMargin - Gross margin percentage (0-1)
 * @param {number} avgLifetimeMonths - Average customer lifetime in months
 * @returns {number} LTV in OMR
 */
export const calculateLTV = (arpa, grossMargin, avgLifetimeMonths) => {
  return arpa * grossMargin * avgLifetimeMonths;
};

/**
 * Calculate LTV/CAC ratio
 * @param {number} ltv - Lifetime Value
 * @param {number} cac - Customer Acquisition Cost
 * @returns {number} Ratio (healthy if >= 3)
 */
export const calculateLTVCACRatio = (ltv, cac) => {
  if (cac === 0) return 0;
  return ltv / cac;
};

/**
 * Calculate payback period in months
 * @param {number} cac - Customer Acquisition Cost
 * @param {number} monthlyGrossProfit - Monthly gross profit per customer
 * @returns {number} Months to recover CAC
 */
export const calculatePaybackPeriod = (cac, monthlyGrossProfit) => {
  if (monthlyGrossProfit === 0) return 0;
  return cac / monthlyGrossProfit;
};

/**
 * Lifetime from churn (months)
 * churnMonthly: 0.03 => 3%
 */
export const lifetimeFromChurn = (churnMonthly) => {
  if (!churnMonthly || churnMonthly <= 0) return 0;
  return 1 / churnMonthly;
};

/**
 * Composite health score in [0,1]
 * weights: LTV/CAC (50%), Payback (30%), Churn (20%)
 */
export const compositeHealthScore = ({ ltvToCac, paybackMonths, churnMonthly }) => {
  const a = Math.min(1, ltvToCac / 3); // >= 3 is healthy
  const b = Math.min(1, 4 / Math.max(0.5, paybackMonths)); // <= 4 months is healthy
  const c = Math.min(1, Math.max(0, (0.05 - Math.max(0, churnMonthly)) / 0.05)); // 5% threshold
  return +(0.5 * a + 0.3 * b + 0.2 * c).toFixed(2);
};

/**
 * Calculate churn rate
 * @param {number} customersLost - Customers lost in period
 * @param {number} totalCustomers - Total customers at start of period
 * @returns {number} Churn rate as percentage
 */
export const calculateChurnRate = (customersLost, totalCustomers) => {
  if (totalCustomers === 0) return 0;
  return (customersLost / totalCustomers) * 100;
};

/**
 * Calculate Monthly Recurring Revenue (MRR)
 * @param {number} customers - Total active customers
 * @param {number} arpa - Average Revenue Per Account
 * @returns {number} MRR in OMR
 */
export const calculateMRR = (customers, arpa) => {
  return customers * arpa;
};

/**
 * Estimate metrics from idea review form
 * @param {object} formData - Form data from idea review
 * @returns {object} Estimated metrics
 */
export const estimateMetricsFromIdea = (formData) => {
  const { pricing, expectedCustomers, operatingCost, marketingBudget, grossMarginPct, churnPct } =
    formData;

  // Simple estimation logic for Dhofar market
  const estimatedCAC = marketingBudget / Math.max(1, expectedCustomers * 0.7); // Assuming 70% conversion funnel
  const grossMargin = typeof grossMarginPct === "number" ? grossMarginPct / 100 : 0.75; // Typical SaaS gross margin
  const churnMonthly = typeof churnPct === "number" ? churnPct / 100 : 0.03; // Default 3%
  const avgLifetimeMonths = lifetimeFromChurn(churnMonthly) || 18; // Derive from churn if provided
  const estimatedLTV = pricing * grossMargin * avgLifetimeMonths;
  const ltvCacRatio = calculateLTVCACRatio(estimatedLTV, estimatedCAC);

  // Determine risk level based on multiple factors
  let riskLevel = "Low";
  let feasibility = "High";

  if (ltvCacRatio < 2) {
    riskLevel = "High";
    feasibility = "Low";
  } else if (ltvCacRatio < 3) {
    riskLevel = "Medium";
    feasibility = "Medium";
  }

  if (pricing < 10) {
    riskLevel = "High";
    feasibility = "Low";
  }

  if (operatingCost > expectedCustomers * pricing * 0.5) {
    if (riskLevel === "Low") riskLevel = "Medium";
    else riskLevel = "High";
  }

  return {
    estimatedCAC: Math.round(estimatedCAC * 10) / 10,
    estimatedLTV: Math.round(estimatedLTV * 10) / 10,
    ltvCacRatio: Math.round(ltvCacRatio * 10) / 10,
    riskLevel,
    feasibility,
    monthlyGrossProfit: Math.round(pricing * grossMargin * 10) / 10,
    paybackMonths:
      Math.round(
        calculatePaybackPeriod(estimatedCAC, pricing * grossMargin) * 10
      ) / 10,
    churnMonthly: Math.round(churnMonthly * 1000) / 1000,
    grossMargin,
  };
};

/**
 * Generate Dhofar-specific recommendations
 * @param {object} formData - Form data
 * @param {object} metrics - Calculated metrics
 * @returns {array} Array of recommendation strings
 */
export const generateRecommendations = (formData, metrics) => {
  const recommendations = [];

  if (metrics.ltvCacRatio >= 3) {
    recommendations.push(
      "✓ اقتصاديات الوحدة القوية تدعم النمو المستدام في سوق ظفار."
    );
  } else {
    recommendations.push(
      "⚠ فكر في تقليل CAC من خلال الشراكات المحلية أو زيادة التسعير."
    );
  }

  if (formData.pricing >= 30 && formData.pricing <= 80) {
    recommendations.push(
      "✓ التسعير متوافق مع نطاق ميزانية الشركات الصغيرة والمتوسطة في ظفار (30-80 ريال عماني/شهر)."
    );
  } else if (formData.pricing < 30) {
    recommendations.push(
      "⚠ نقطة السعر قد تكون منخفضة جداً لتغطية التكاليف التشغيلية في عُمان."
    );
  }

  recommendations.push(
    "💡 شارك مع غرفة تجارة وصناعة صلالة والحاضنات المحلية لبناء المصداقية."
  );

  if (
    formData.targetCustomers.toLowerCase().includes("sme") ||
    formData.targetCustomers.toLowerCase().includes("small") ||
    formData.targetCustomers.includes("صغيرة") ||
    formData.targetCustomers.includes("متوسطة")
  ) {
    recommendations.push(
      "💡 ركز على الشركات الصغيرة والمتوسطة في قطاع السياحة والزراعة في صلالة مع نقاط ألم تشغيلية واضحة."
    );
  }

  if (metrics.riskLevel === "Low") {
    recommendations.push(
      "✓ فكر في التوسع إلى مسقط بعد إثبات النموذج في ظفار (6-12 شهراً)."
    );
  }

  return recommendations;
};

/**
 * Format currency for Oman (OMR)
 * @param {number} value - Numeric value
 * @returns {string} Formatted currency string
 */
export const formatOMR = (value) => {
  return `${Math.round(value * 10) / 10} OMR`;
};

/**
 * Format percentage
 * @param {number} value - Numeric value
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  return `${Math.round(value * 10) / 10}%`;
};
