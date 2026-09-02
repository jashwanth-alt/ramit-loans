"use client";

import { Button } from "@/components/ui/button";
import { useLoanForm } from "@/components/loan-form/form-context";

export function FinalCta() {
  const { open } = useLoanForm();

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgba(47,94,237,0.35), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Find the Right Loan?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-white/70">
            Tell us what you need and explore suitable loan options with guided assistance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => open()}>
              Check Eligibility
            </Button>
            <Button size="lg" variant="outline-light" href="/emi-calculator">
              Calculate EMI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
