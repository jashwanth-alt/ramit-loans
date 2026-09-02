"use client";

import { useMemo, useState } from "react";
import { calculateEMI, generateAmortizationSchedule } from "@/lib/emi";
import { formatINR, formatNumberIN } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { AnimatedAmount } from "./animated-amount";
import { PrincipalInterestDonut } from "@/components/emi-charts/principal-interest-donut";
import { RepaymentChart } from "@/components/emi-charts/repayment-chart";
import { AmortizationTable } from "./amortization-table";
import { RateComparison } from "./rate-comparison";
import { Button } from "@/components/ui/button";
import { useLoanForm } from "@/components/loan-form/form-context";
import { cn } from "@/lib/utils";

const amountPresets = [500000, 1000000, 2000000, 5000000];
const tenurePresets = [5, 10, 15, 20, 30];

interface Props {
  variant?: "full" | "compact";
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
}

export function EMICalculator({
  variant = "full",
  initialAmount = 1000000,
  initialRate = 10.5,
  initialTenure = 5,
}: Props) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenure);
  const { open } = useLoanForm();

  const result = useMemo(
    () => calculateEMI({ principal: amount, annualRatePct: rate, tenureYears: tenure }),
    [amount, rate, tenure]
  );

  const schedule = useMemo(
    () => generateAmortizationSchedule({ principal: amount, annualRatePct: rate, tenureYears: tenure }),
    [amount, rate, tenure]
  );

  return (
    <div className={cn("grid gap-8", variant === "full" ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-2")}>
      {/* Inputs */}
      <div className="space-y-7 rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
        <FieldGroup
          label="Loan Amount"
          value={formatINR(amount)}
          min={50000}
          max={10000000}
          step={10000}
          current={amount}
          onChange={setAmount}
          trackColor="var(--blue)"
        />

        {variant === "full" && (
          <div className="flex flex-wrap gap-2">
            {amountPresets.map((p) => (
              <PresetChip key={p} active={amount === p} onClick={() => setAmount(p)}>
                {formatINR(p, { compact: true })}
              </PresetChip>
            ))}
          </div>
        )}

        <FieldGroup
          label="Interest Rate (p.a.)"
          value={`${rate.toFixed(2)}%`}
          min={1}
          max={30}
          step={0.05}
          current={rate}
          onChange={setRate}
          trackColor="var(--cyan)"
        />

        <FieldGroup
          label="Tenure"
          value={`${tenure} ${tenure === 1 ? "year" : "years"}`}
          min={1}
          max={30}
          step={1}
          current={tenure}
          onChange={setTenure}
          trackColor="var(--purple)"
        />

        {variant === "full" && (
          <div className="flex flex-wrap gap-2">
            {tenurePresets.map((t) => (
              <PresetChip key={t} active={tenure === t} onClick={() => setTenure(t)}>
                {t} Yrs
              </PresetChip>
            ))}
          </div>
        )}

        {variant === "compact" && (
          <Button className="w-full" onClick={() => open()}>
            Get Loan Assistance
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="rounded-3xl border border-[var(--line)] bg-gradient-to-br from-navy to-navy-2 p-6 text-white sm:p-8">
        <p className="text-sm text-white/60">Your Monthly EMI</p>
        <AnimatedAmount value={result.emi} className="mt-2 block font-display text-4xl font-extrabold sm:text-[2.75rem]" />

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
          <ResultStat label="Principal" value={result.principal} />
          <ResultStat label="Total Interest" value={result.totalInterest} />
          <ResultStat label="Total Payable" value={result.totalPayment} />
        </div>

        <div className="mt-6 rounded-2xl bg-white/5 p-2">
          <PrincipalInterestDonutOnDark principal={result.principal} interest={result.totalInterest} />
        </div>

        {variant === "full" && (
          <Button variant="outline-light" className="mt-6 w-full" onClick={() => open()}>
            Get Loan Assistance
          </Button>
        )}
      </div>

      {variant === "full" && (
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="mb-4 font-display text-lg font-semibold">Repayment Over the Years</p>
            <div className="rounded-3xl border border-[var(--line)] bg-white p-6">
              <RepaymentChart schedule={schedule} />
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-lg font-semibold">Compare Interest Rates</p>
            <RateComparison principal={amount} tenureYears={tenure} currentRate={rate} />
          </div>

          <div>
            <p className="mb-4 font-display text-lg font-semibold">Repayment Schedule</p>
            <AmortizationTable schedule={schedule} />
          </div>
        </div>
      )}
    </div>
  );
}

function PrincipalInterestDonutOnDark({ principal, interest }: { principal: number; interest: number }) {
  return (
    <div className="[&_.text-ink-soft]:text-white/60 [&_.text-ink]:text-white">
      <PrincipalInterestDonut principal={principal} interest={interest} />
    </div>
  );
}

function ResultStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 text-sm font-semibold sm:text-base">{formatINR(value, { compact: true })}</p>
    </div>
  );
}

function FieldGroup({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
  trackColor,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
  trackColor: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <input
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.]/g, "");
            const n = Number(raw);
            if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          className="w-32 rounded-lg border border-[var(--line)] bg-paper px-2.5 py-1 text-right text-sm font-semibold text-ink outline-none focus:border-blue"
        />
      </div>
      <Slider min={min} max={max} step={step} value={current} onChange={onChange} trackColor={trackColor} />
      <div className="mt-1.5 flex justify-between text-xs text-ink-soft/60">
        <span>{formatNumberIN(min)}</span>
        <span>{formatNumberIN(max)}</span>
      </div>
    </div>
  );
}

function PresetChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-blue bg-blue text-white"
          : "border-[var(--line)] text-ink-soft hover:border-blue/40 hover:text-blue"
      )}
    >
      {children}
    </button>
  );
}
