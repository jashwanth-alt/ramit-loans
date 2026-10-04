"use client";

import { useMemo, useState } from "react";
import { calculateEMI, generateAmortizationSchedule } from "@/lib/emi";
import { formatINR } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { AnimatedAmount } from "./animated-amount";
import { PrincipalInterestDonut } from "@/components/emi-charts/principal-interest-donut";
import { RepaymentChart } from "@/components/emi-charts/repayment-chart";
import { AmortizationTable } from "./amortization-table";
import { RateComparison } from "./rate-comparison";
import { Button } from "@/components/ui/button";
import { useLoanForm } from "@/components/loan-form/form-context";
import { cn } from "@/lib/utils";

const LAKH = 100000;
const CRORE = 10000000;

const AMOUNT_MIN = 1 * LAKH; // ₹1 Lakh
const AMOUNT_MAX = 1 * CRORE; // ₹1 Crore
const amountPresets = [1 * LAKH, 5 * LAKH, 10 * LAKH, 25 * LAKH, 50 * LAKH, 1 * CRORE];
const tenurePresets = [5, 10, 15, 20, 30];

interface Props {
  variant?: "full" | "compact";
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
}

function amountLabel(v: number) {
  if (v >= CRORE) return `${parseFloat((v / CRORE).toFixed(2))} Crore`;
  return `${parseFloat((v / LAKH).toFixed(2))} Lakh`;
}

export function EMICalculator({ variant = "full", initialAmount = 1000000, initialRate = 10.5, initialTenure = 5 }: Props) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [tenure, setTenure] = useState(initialTenure);
  const { open } = useLoanForm();

  const result = useMemo(() => calculateEMI({ principal: amount, annualRatePct: rate, tenureYears: tenure }), [amount, rate, tenure]);

  const schedule = useMemo(
    () => generateAmortizationSchedule({ principal: amount, annualRatePct: rate, tenureYears: tenure }),
    [amount, rate, tenure],
  );

  return (
    <div className={cn("grid gap-8", variant === "full" ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-2")}>
      {/* Inputs */}
      <div className="space-y-7 rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8">
        <FieldGroup
          label="Loan Amount"
          display={formatINR(amount)}
          min={AMOUNT_MIN}
          max={AMOUNT_MAX}
          step={10000}
          current={amount}
          onChange={setAmount}
          trackColor="var(--blue)"
          minLabel="₹1 Lakh"
          maxLabel="₹1 Crore"
          hint={`= ${amountLabel(amount)}`}
          allowDecimal={false}
        />

        <div className="flex flex-wrap gap-2">
          {amountPresets.map((p) => (
            <PresetChip key={p} active={amount === p} onClick={() => setAmount(p)}>
              {formatINR(p, { compact: true })}
            </PresetChip>
          ))}
        </div>

        <FieldGroup
          label="Interest Rate (p.a.)"
          display={`${rate.toFixed(2)}%`}
          min={1}
          max={30}
          step={0.05}
          current={rate}
          onChange={setRate}
          trackColor="var(--cyan)"
          minLabel="1%"
          maxLabel="30%"
          allowDecimal
        />

        <FieldGroup
          label="Tenure"
          display={`${tenure} ${tenure === 1 ? "year" : "years"}`}
          min={1}
          max={30}
          step={1}
          current={tenure}
          onChange={setTenure}
          trackColor="var(--purple)"
          minLabel="1 year"
          maxLabel="30 years"
          allowDecimal={false}
        />

        <div className="flex flex-wrap gap-2">
          {tenurePresets.map((t) => (
            <PresetChip key={t} active={tenure === t} onClick={() => setTenure(t)}>
              {t} Yrs
            </PresetChip>
          ))}
        </div>

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

/**
 * Slider + typed input, kept in sync.
 * - While typing, the draft text is shown as-is and the slider/results update live
 *   as soon as the typed number is inside [min, max].
 * - On blur the value is clamped to [min, max] and the formatted display comes back.
 */
function FieldGroup({
  label,
  display,
  min,
  max,
  step,
  current,
  onChange,
  trackColor,
  minLabel,
  maxLabel,
  hint,
  allowDecimal,
}: {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
  trackColor: string;
  minLabel: string;
  maxLabel: string;
  hint?: string;
  allowDecimal: boolean;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  const draftNum = draft !== null && draft !== "" ? Number(draft) : NaN;
  const outOfRange = draft !== null && draft !== "" && !Number.isNaN(draftNum) && (draftNum < min || draftNum > max);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink-soft">{label}</label>
        <input
          type="text"
          inputMode={allowDecimal ? "decimal" : "numeric"}
          autoComplete="off"
          value={draft ?? display}
          onFocus={(e) => {
            setDraft(String(current));
            // select everything so the user can just type a new number
            requestAnimationFrame(() => e.target.select());
          }}
          onChange={(e) => {
            let v = e.target.value.replace(allowDecimal ? /[^0-9.]/g : /[^0-9]/g, "");
            if (allowDecimal) {
              const [head, ...rest] = v.split(".");
              v = rest.length ? `${head}.${rest.join("")}` : head;
            }
            setDraft(v);
            const n = Number(v);
            if (v !== "" && !Number.isNaN(n) && n >= min && n <= max) onChange(n);
          }}
          onBlur={() => {
            const n = Number(draft);
            if (draft !== null && draft !== "" && !Number.isNaN(n)) {
              onChange(Math.min(max, Math.max(min, n)));
            }
            setDraft(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className={cn(
            "w-40 rounded-lg border bg-paper px-2.5 py-1 text-right text-sm font-semibold text-ink outline-none focus:border-blue",
            outOfRange ? "border-red-400" : "border-[var(--line)]",
          )}
        />
      </div>

      <Slider min={min} max={max} step={step} value={current} onChange={onChange} trackColor={trackColor} />

      <div className="mt-1.5 flex justify-between text-xs text-ink-soft/60">
        <span>{minLabel}</span>
        {hint && !outOfRange && <span>{hint}</span>}
        {outOfRange && (
          <span className="text-red-500">
            Allowed: {minLabel} – {maxLabel}
          </span>
        )}
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function PresetChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active ? "border-blue bg-blue text-white" : "border-[var(--line)] text-ink-soft hover:border-blue/40 hover:text-blue",
      )}
    >
      {children}
    </button>
  );
}
