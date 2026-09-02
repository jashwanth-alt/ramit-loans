"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText } from "lucide-react";
import { LoanProduct } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { EMICalculator } from "@/components/emi-calculator/emi-calculator";
import { useLoanForm } from "@/components/loan-form/form-context";

export function LoanDetailPage({ loan }: { loan: LoanProduct }) {
  const { open } = useLoanForm();

  return (
    <>
      <section className="relative -mt-[92px] overflow-hidden bg-navy pb-20 pt-[158px] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(55% 50% at 20% 10%, rgba(47,94,237,0.35), transparent 60%), radial-gradient(45% 40% at 85% 20%, rgba(124,92,252,0.25), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium text-cyan">{loan.name}</p>
            <h1 className="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">{loan.tagline}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{loan.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => open(loan.name)}>
                Check Eligibility
              </Button>
              <Button size="lg" variant="outline-light" href="/emi-calculator">
                Calculate EMI
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Interest Rate" value={loan.interestRateLabel} />
              <StatCard label="Loan Amount" value={loan.amountLabel} />
              <StatCard label="Tenure" value={loan.tenureLabel} />
            </div>
            <p className="mt-3 text-xs text-white/40">Illustrative MVP figures — not a real offer.</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">Benefits</h2>
            <ul className="mt-5 space-y-3">
              {loan.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold">Eligibility</h2>
            <ul className="mt-5 space-y-3">
              {loan.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold">Required Documents</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {loan.documents.map((doc) => (
                <div key={doc} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-4">
                  <FileText className="h-5 w-5 text-blue" />
                  <span className="text-sm font-medium">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl bg-paper-2 p-6">
              <p className="font-display text-lg font-semibold">Illustrative Rate & Tenure</p>
              <div className="mt-4 space-y-3 text-sm">
                <Row label="Interest Rate" value={loan.interestRateLabel} />
                <Row label="Loan Amount" value={loan.amountLabel} />
                <Row label="Tenure" value={loan.tenureLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Calculate Your {loan.shortName} Loan EMI</h2>
          <div className="mt-10">
            <EMICalculator
              variant="compact"
              initialAmount={Math.min(loan.amountMax, Math.max(loan.amountMin, 1000000))}
              initialRate={loan.interestRateMin}
              initialTenure={Math.min(loan.tenureMaxYears, 5)}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-8">
          <FaqAccordion items={loan.faqs} />
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-dark rounded-2xl p-5">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1.5 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
      <span className="text-ink-soft">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
