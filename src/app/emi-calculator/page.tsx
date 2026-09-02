import type { Metadata } from "next";
import { EMICalculator } from "@/components/emi-calculator/emi-calculator";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Calculate your loan EMI instantly — see principal vs interest, a year-by-year repayment chart, rate comparisons and the full amortization schedule.",
};

export default function EmiCalculatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-blue">EMI Calculator</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Know Your EMI Before You Apply
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Adjust the loan amount, interest rate and tenure to see your monthly payment,
          total interest and full repayment schedule update instantly.
        </p>
      </div>

      <div className="mt-12">
        <EMICalculator variant="full" />
      </div>
    </section>
  );
}
