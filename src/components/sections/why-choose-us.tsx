"use client";

import { motion } from "framer-motion";
import {
  FileCheck2,
  Handshake,
  Landmark,
  ShieldCheck,
  UserCheck,
  Zap,
} from "lucide-react";
import { whyChooseUs } from "@/data/mockData";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  UserCheck,
  ShieldCheck,
  Zap,
  FileCheck2,
  Handshake,
};

export function WhyChooseUs() {
  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-white [&_p]:text-white/60 [&_h2]:text-white">
          <SectionHeading eyebrow="Why Finlace" title="Why Choose Us" align="center" />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="glass-dark rounded-3xl p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
