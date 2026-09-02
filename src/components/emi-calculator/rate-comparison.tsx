"use client";

import { compareInterestRates } from "@/lib/emi";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function RateComparison({
  principal,
  tenureYears,
  currentRate,
}: {
  principal: number;
  tenureYears: number;
  currentRate: number;
}) {
  const rates = [9, 10, 11, 12];
  const results = compareInterestRates({ principal, annualRatePct: 0, tenureYears }, rates);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {results.map(({ rate, emi }) => (
        <div
          key={rate}
          className={cn(
            "rounded-2xl border p-4 text-center transition-colors",
            rate === Math.round(currentRate)
              ? "border-blue bg-blue/5"
              : "border-[var(--line)] bg-white"
          )}
        >
          <p className="text-sm font-semibold text-ink-soft">{rate}%</p>
          <p className="mt-2 font-display text-lg font-bold">{formatINR(emi)}</p>
          <p className="text-xs text-ink-soft">/ month</p>
        </div>
      ))}
    </div>
  );
}
