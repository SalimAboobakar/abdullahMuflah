// Scenario generation engine (front-end only)
// Builds 12-month datasets for healthy and at-risk scenarios from simple inputs
// This replaces static mocks when form data is available

import {
  calculateLTV,
  calculateLTVCACRatio,
  calculatePaybackPeriod,
} from "./calculations";

// Helper: clamp number into [min, max]
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Build monthly series given base parameters
function buildMonthlySeries({
  months = 12,
  startCustomers = 6,
  arpa,
  churnMonthly, // 0.03 => 3%
  cac,
  monthlySMBudget, // marketing/sales budget per month
}) {
  const data = [];
  let customers = startCustomers;

  for (let m = 1; m <= months; m++) {
    const newCustomers =
      monthlySMBudget > 0 && cac > 0
        ? Math.max(0, Math.round(monthlySMBudget / cac))
        : Math.round(startCustomers / months);
    const churned = Math.round(customers * clamp(churnMonthly, 0, 0.9));
    customers = Math.max(0, customers - churned + newCustomers);
    const mrr = Math.round(customers * arpa);
    data.push({
      month: m,
      customers,
      mrr,
      churn: +(churnMonthly * 100).toFixed(1),
      newCustomers,
      churned,
    });
  }
  return data;
}

export function buildScenariosFromInputs({
  arpa, // monthly ARPA (OMR)
  grossMargin, // 0..1
  monthlyChurn, // 0..1
  cacEstimate, // OMR
  startCustomers = 6,
  monthlySMBudget = 800,
}) {
  // Healthy profile tweaks
  const healthy = {
    arpa: clamp(arpa, 35, 80),
    churn: clamp(monthlyChurn, 0.02, 0.05),
    cac: clamp(cacEstimate, 10, 25),
    grossMargin: clamp(grossMargin, 0.65, 0.85),
    smb: monthlySMBudget,
  };
  // At-risk profile tweaks
  const risk = {
    arpa: clamp(arpa * 0.25, 3, 12),
    churn: clamp(Math.max(monthlyChurn, 0.12), 0.12, 0.25),
    cac: clamp(cacEstimate * 1.3, 20, 40),
    grossMargin: clamp(Math.min(grossMargin, 0.75), 0.55, 0.75),
    smb: Math.max(200, monthlySMBudget * 0.6),
  };

  const monthlyHealthy = buildMonthlySeries({
    arpa: healthy.arpa,
    churnMonthly: healthy.churn,
    cac: healthy.cac,
    startCustomers,
    monthlySMBudget: healthy.smb,
  });

  const monthlyRisk = buildMonthlySeries({
    arpa: risk.arpa,
    churnMonthly: risk.churn,
    cac: risk.cac,
    startCustomers: Math.max(4, Math.round(startCustomers * 0.8)),
    monthlySMBudget: risk.smb,
  });

  // Metrics summary
  const lifetimeHealthy = 1 / healthy.churn;
  const ltvHealthy = calculateLTV(
    healthy.arpa,
    healthy.grossMargin,
    lifetimeHealthy
  );
  const ltvCacHealthy = calculateLTVCACRatio(ltvHealthy, healthy.cac);
  const paybackHealthy = calculatePaybackPeriod(
    healthy.cac,
    healthy.arpa * healthy.grossMargin
  );

  const lifetimeRisk = 1 / risk.churn;
  const ltvRisk = calculateLTV(risk.arpa, risk.grossMargin, lifetimeRisk);
  const ltvCacRisk = calculateLTVCACRatio(ltvRisk, risk.cac);
  const paybackRisk = calculatePaybackPeriod(
    risk.cac,
    risk.arpa * risk.grossMargin
  );

  return {
    healthy: {
      name: "سيناريو صحي",
      description: "نمو متزن في ظفار مع اقتصاديات وحدة سليمة.",
      region: "ظفار، عُمان",
      monthlyData: monthlyHealthy,
      metrics: {
        arpa: healthy.arpa,
        cac: +healthy.cac.toFixed(1),
        ltv: +ltvHealthy.toFixed(1),
        ltvCacRatio: +ltvCacHealthy.toFixed(1),
        avgChurn: +(healthy.churn * 100).toFixed(1),
        grossMargin: +(healthy.grossMargin * 100).toFixed(0),
        paybackPeriod: +paybackHealthy.toFixed(1),
      },
      insights: [
        "نمو مستدام في قطاع B2B بظفار.",
        "LTV/CAC صحي يدعم التوسع لاحقاً.",
      ],
      status: "healthy",
    },
    risk: {
      name: "سيناريو معرّض للخطر",
      description: "تسعير منخفض/عرض غير واضح يؤدي لاقتصاديات ضعيفة.",
      region: "ظفار، عُمان",
      monthlyData: monthlyRisk,
      metrics: {
        arpa: risk.arpa,
        cac: +risk.cac.toFixed(1),
        ltv: +ltvRisk.toFixed(1),
        ltvCacRatio: +ltvCacRisk.toFixed(1),
        avgChurn: +(risk.churn * 100).toFixed(1),
        grossMargin: +(risk.grossMargin * 100).toFixed(0),
        paybackPeriod: +paybackRisk.toFixed(1),
      },
      insights: [
        "LTV/CAC منخفض يتطلب تعديل التسعير أو CAC.",
        "التسرب المرتفع يضر بالنمو طويل الأجل.",
      ],
      status: "at-risk",
    },
  };
}
