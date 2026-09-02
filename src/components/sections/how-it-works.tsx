"use client";

import { motion } from "framer-motion";
import { howItWorks } from "@/data/mockData";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";

export function HowItWorks() {
  return (
    <section className="bg-paper-2 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Process" title="How It Works" align="center" />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--line)] lg:block" />
          {howItWorks.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
