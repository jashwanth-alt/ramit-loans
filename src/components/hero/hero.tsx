"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useLoanForm } from "@/components/loan-form/form-context";
import { HandCardIllustration } from "./hand-card-illustration";

export function Hero() {
  const { open } = useLoanForm();

  return (
    <section className="relative -mt-[92px] overflow-hidden pb-20 pt-[134px] sm:pt-[136px] min-h-screen">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 8% 0%, rgba(124,92,252,0.16), transparent 60%), radial-gradient(50% 45% at 95% 10%, rgba(31,209,224,0.18), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(47,94,237,0.10), transparent 60%), linear-gradient(180deg, #f2f0fb 0%, #eef4fc 45%, #f5f7fc 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="mb-6 md:mt-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm text-ink-soft backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-blue" />
            Trusted by 10,000+ borrowers across India
          </div>

          <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.08] text-ink sm:text-6xl">
            Find the Right Loan.
            <br />
            Get the Right Guidance.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Explore loan options, calculate your EMI, and get personalized assistance from trusted lending partners.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={() => open()}>
              Check Loan Eligibility
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href="/emi-calculator">
              Calculate EMI
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto h-[460px] w-full max-w-md"
        >
          <div
            className="pointer-events-none absolute inset-8 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(47,94,237,0.18), rgba(124,92,252,0.14) 55%, transparent 75%)",
            }}
          />
          <HandCardIllustration className="relative h-full w-full" />

          <FloatingChip className="hidden md:block left-0 top-4 w-44" delay={0}>
            <p className="text-xs text-ink-soft">Loan Approved</p>
            <p className="mt-1 font-display text-lg font-bold text-green">₹12,50,000</p>
          </FloatingChip>

          <FloatingChip className="right-0 top-12  w-40" delay={0.4}>
            <div className="flex items-center gap-1.5 text-xs text-ink-soft">
              <Sparkles className="h-3.5 w-3.5 text-purple" /> Interest Rate
            </div>
            <p className="mt-1 font-display text-lg font-bold">8.9% p.a.</p>
          </FloatingChip>

          <FloatingChip className="bottom-4 left-2 w-44" delay={0.7}>
            <p className="text-xs text-ink-soft">Credit Score</p>
            <p className="mt-1 font-display text-lg font-bold">782</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan to-green" />
            </div>
          </FloatingChip>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingChip({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <GlassPanel className="p-3.5">{children}</GlassPanel>
    </motion.div>
  );
}
