import type { Metadata } from "next";
import { ShieldCheck, Target, Users } from "lucide-react";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";
import { StatsSection } from "@/components/stats/stats-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description: "Finlace connects borrowers with 25+ lending partners and guides them from application to disbursement.",
};

const values = [
  { icon: Target, title: "Clarity First", description: "We show real trade-offs — rates, tenure, fees — before you commit to anything." },
  { icon: ShieldCheck, title: "Transparent by Default", description: "No hidden charges, no fine print you weren't told about upfront." },
  { icon: Users, title: "Guided, Not Automated", description: "A specialist stays with you from application through to disbursement." },
];

export default function AboutPage() {
  return (
    <>
      <section className="-mt-[92px] bg-navy pb-20 pt-[158px] text-white">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-sm font-medium text-cyan">About Finlace</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">A clearer way to find the right loan</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Finlace is a guided loan marketplace — we compare offers from 25+ banks and NBFCs so you can make an informed decision, without
            chasing branches or reading a dozen different rate sheets.
          </p>
        </div>
      </section>

      <StatsSection />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="What We Believe" title="How We Work" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-[var(--line)] bg-white p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <FinalCta />
    </>
  );
}
