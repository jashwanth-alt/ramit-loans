"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { calculateEMI } from "@/lib/emi";
import { formatINR } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { AnimatedAmount } from "@/components/emi-calculator/animated-amount";
import { Button } from "@/components/ui/button";
import { useLoanForm } from "@/components/loan-form/form-context";

export function HeroEmiWidget() {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(3);
  const { open } = useLoanForm();

  const result = useMemo(() => calculateEMI({ principal: amount, annualRatePct: 10.5, tenureYears: tenure }), [amount, tenure]);

  return (
    <div className="hidden md:block rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_-24px_rgba(10,15,44,0.25)] backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">Estimated monthly EMI</p>
        <AnimatedAmount value={result.emi} className="font-display text-2xl font-extrabold text-ink" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-ink-soft">
            <span>Loan Amount</span>
            <span className="font-semibold text-ink">{formatINR(amount)}</span>
          </div>
          <Slider min={50000} max={2000000} step={10000} value={amount} onChange={setAmount} trackColor="var(--blue)" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-ink-soft">
            <span>Tenure</span>
            <span className="font-semibold text-ink">
              {tenure} {tenure === 1 ? "year" : "years"}
            </span>
          </div>
          <Slider min={1} max={10} step={1} value={tenure} onChange={setTenure} trackColor="var(--purple)" />
        </div>
      </div>

      <Button className="mt-5 w-full" onClick={() => open()}>
        Get Loan Assistance
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-3 text-center text-[11px] text-ink-soft/70">
        Indicative EMI at 10.5% p.a. — actual rate depends on lender & profile
      </p>
    </div>
  );
}
