import { EMICalculator } from "@/components/emi-calculator/emi-calculator";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";
import { Button } from "@/components/ui/button";

export function EmiHomeSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="EMI Calculator" title="Know Your EMI Before You Apply" description="Move the sliders to see your monthly payment, total interest and repayment split update instantly." />
        <Button variant="secondary" href="/emi-calculator">
          Open Full Calculator
        </Button>
      </div>

      <div className="mt-12">
        <EMICalculator variant="compact" />
      </div>
    </section>
  );
}
