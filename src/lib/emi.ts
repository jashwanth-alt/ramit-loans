// Core EMI math utilities. Pure functions only — no UI/state here.

export interface EMIInput {
  principal: number;
  annualRatePct: number; // e.g. 10.5
  tenureYears: number;
}

export interface EMIResult {
  emi: number;
  principal: number;
  totalInterest: number;
  totalPayment: number;
}

/**
 * EMI = P × R × (1 + R)^N / ((1 + R)^N - 1)
 * R = monthly interest rate (annual / 12 / 100)
 * N = number of months
 * Handles the zero-interest edge case (straight-line division).
 */
export function calculateEMI({ principal, annualRatePct, tenureYears }: EMIInput): EMIResult {
  const n = Math.max(1, Math.round(tenureYears * 12));
  const p = Math.max(0, principal);

  if (annualRatePct <= 0) {
    const emi = p / n;
    return {
      emi,
      principal: p,
      totalInterest: 0,
      totalPayment: p,
    };
  }

  const r = annualRatePct / 12 / 100;
  const factor = Math.pow(1 + r, n);
  const emi = (p * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return {
    emi,
    principal: p,
    totalInterest,
    totalPayment,
  };
}

export interface AmortizationYear {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPayment: number;
  closingBalance: number;
}

/**
 * Builds a yearly (not monthly) amortization schedule so the table
 * stays compact regardless of tenure length.
 */
export function generateAmortizationSchedule({
  principal,
  annualRatePct,
  tenureYears,
}: EMIInput): AmortizationYear[] {
  const n = Math.max(1, Math.round(tenureYears * 12));
  const p = Math.max(0, principal);
  const r = annualRatePct / 12 / 100;
  const { emi } = calculateEMI({ principal, annualRatePct, tenureYears });

  const schedule: AmortizationYear[] = [];
  let balance = p;

  for (let year = 1; year <= Math.ceil(n / 12); year++) {
    const opening = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;
    const monthsThisYear = Math.min(12, n - (year - 1) * 12);

    for (let m = 0; m < monthsThisYear; m++) {
      const interestPortion = annualRatePct <= 0 ? 0 : balance * r;
      const principalPortion = emi - interestPortion;
      yearInterest += interestPortion;
      yearPrincipal += principalPortion;
      balance -= principalPortion;
    }

    balance = Math.max(0, balance);

    schedule.push({
      year,
      openingBalance: opening,
      principalPaid: yearPrincipal,
      interestPaid: yearInterest,
      totalPayment: yearPrincipal + yearInterest,
      closingBalance: balance,
    });
  }

  return schedule;
}

export function compareInterestRates(
  base: EMIInput,
  rates: number[]
): { rate: number; emi: number }[] {
  return rates.map((rate) => ({
    rate,
    emi: calculateEMI({ ...base, annualRatePct: rate }).emi,
  }));
}
