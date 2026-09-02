"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Building2, Car, GraduationCap, Home, User } from "lucide-react";
import { loanProducts, LoanProduct } from "@/data/mockData";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "personal-loan": User,
  "home-loan": Home,
  "business-loan": Briefcase,
  "car-loan": Car,
  "education-loan": GraduationCap,
  "loan-against-property": Building2,
};

const accentText: Record<LoanProduct["accent"], string> = {
  blue: "text-blue",
  purple: "text-purple",
  cyan: "text-cyan",
  green: "text-green",
  amber: "text-amber",
};

const accentBg: Record<LoanProduct["accent"], string> = {
  blue: "bg-blue/10",
  purple: "bg-purple/10",
  cyan: "bg-cyan/10",
  green: "bg-green/10",
  amber: "bg-amber/10",
};

export function LoanCardsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Loan Products"
        title="Loans Built Around Your Needs"
        description="Six loan types, each matched with lending partners suited to your goal — from everyday expenses to long-term investments."
      />

      {/* Mobile: compact single-column grid — icon + name only */}
      <div className="mt-12 grid grid-cols-1 gap-3 sm:hidden">
        {loanProducts.map((loan, i) => {
          const Icon = icons[loan.slug];
          return (
            <motion.div
              key={loan.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/${loan.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition-colors active:bg-paper-2"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentBg[loan.accent]} ${accentText[loan.accent]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 font-medium text-ink">{loan.name}</span>
                <ArrowUpRight className="h-4 w-4 text-ink-soft" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Tablet & up: full detail cards */}
      <div className="mt-12 hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {loanProducts.map((loan, i) => {
          const Icon = icons[loan.slug];
          return (
            <motion.div
              key={loan.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/${loan.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_48px_-24px_rgba(10,15,44,0.25)]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentBg[loan.accent]} ${accentText[loan.accent]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 text-ink-soft opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold">{loan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{loan.description}</p>

                <ul className="mt-5 space-y-2">
                  {loan.cardPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-ink-soft">
                      <span className={`h-1.5 w-1.5 rounded-full ${accentBg[loan.accent]}`} />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4 text-sm">
                  <span className="text-ink-soft">From</span>
                  <span className="font-semibold text-ink">{loan.interestRateLabel} p.a.</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="text-sm font-medium text-blue">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
