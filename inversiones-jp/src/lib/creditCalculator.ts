export interface CreditTier {
  minPrice: number;
  maxPrice: number;
  monthlyRate: number; // e.g. 0.15 for 15%
  monthlyRatePercent: number; // 15
  name: string;
  badge: string;
  badgeColor: string;
  defaultWeeks: number;
  recommendedInitial: number;
}

export const CREDIT_TIERS: CreditTier[] = [
  {
    minPrice: 0,
    maxPrice: 999,
    monthlyRate: 0.15,
    monthlyRatePercent: 15,
    name: 'Gama Económica',
    badge: 'Tasa 15% Mensual',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    defaultWeeks: 12,
    recommendedInitial: 120
  },
  {
    minPrice: 1000,
    maxPrice: 1500,
    monthlyRate: 0.10,
    monthlyRatePercent: 10,
    name: 'Gama Media',
    badge: 'Tasa Preferencial 10% Mensual',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    defaultWeeks: 12,
    recommendedInitial: 150
  },
  {
    minPrice: 1501,
    maxPrice: 2000,
    monthlyRate: 0.075,
    monthlyRatePercent: 7.5,
    name: 'Gama Media-Alta',
    badge: 'Tasa Reducida 7.5% Mensual',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    defaultWeeks: 12,
    recommendedInitial: 200
  },
  {
    minPrice: 2001,
    maxPrice: 99999,
    monthlyRate: 0.05,
    monthlyRatePercent: 5,
    name: 'Gama Premium / iPhone',
    badge: 'Tasa Exclusiva 5% Mensual',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    defaultWeeks: 30,
    recommendedInitial: 500
  }
];

export interface CalculationResult {
  priceCash: number;
  initialPayment: number;
  balance: number;
  weeks: number;
  months: number;
  monthlyRatePercent: number;
  totalInterestPercent: number;
  interestAmount: number;
  totalFinanced: number;
  weeklyPayment: number;
  totalPaid: number;
  tier: CreditTier;
  recommendation: string;
}

export function getCreditTier(price: number): CreditTier {
  for (const tier of CREDIT_TIERS) {
    if (price >= tier.minPrice && price <= tier.maxPrice) {
      return tier;
    }
  }
  return CREDIT_TIERS[CREDIT_TIERS.length - 1];
}

export function calculateCreditPlan(
  priceCash: number,
  customInitial?: number,
  customWeeks?: number
): CalculationResult {
  const safePrice = Math.max(100, priceCash);
  const tier = getCreditTier(safePrice);

  const initialPayment = customInitial !== undefined
    ? Math.max(0, Math.min(customInitial, safePrice - 50))
    : tier.recommendedInitial;

  const balance = Math.max(0, safePrice - initialPayment);
  const weeks = customWeeks || tier.defaultWeeks;
  const months = weeks / 4;

  const totalInterestPercent = tier.monthlyRate * months;
  const interestAmount = Math.round(balance * totalInterestPercent);
  const totalFinanced = balance + interestAmount;
  const weeklyPayment = weeks > 0 ? Math.round(totalFinanced / weeks) : 0;
  const totalPaid = initialPayment + totalFinanced;

  let recommendation = '';
  if (safePrice < 1000) {
    recommendation = `Plan ideal de ${weeks} semanas con inicial desde S/ ${initialPayment}. Tu cuota semanal es de solo S/ ${weeklyPayment}, súper cómoda y accesible.`;
  } else if (safePrice <= 1500) {
    recommendation = `En ${weeks} semanas tu cuota semanal es de solo S/ ${weeklyPayment}, adaptándose perfectamente a tus ingresos semanales.`;
  } else if (safePrice <= 2000) {
    recommendation = `Llévate este potente equipo con inicial desde S/ ${initialPayment} y cuotas semanales de S/ ${weeklyPayment} con entrega inmediata.`;
  } else {
    recommendation = `El plan perfecto para estrenar tu iPhone: en ${weeks} semanas con cuotas fijas de S/ ${weeklyPayment} semanales sin descapitalizarte.`;
  }

  return {
    priceCash: safePrice,
    initialPayment,
    balance,
    weeks,
    months,
    monthlyRatePercent: tier.monthlyRatePercent,
    totalInterestPercent: Math.round(totalInterestPercent * 100),
    interestAmount,
    totalFinanced,
    weeklyPayment,
    totalPaid,
    tier,
    recommendation
  };
}

