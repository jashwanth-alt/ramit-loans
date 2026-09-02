"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/mockData";
import { SectionHeading } from "@/components/loan-cards/loan-cards-section";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Demo Reviews" title="What Borrowers Say" description="Illustrative demo testimonials for this MVP build." />

      <div className="relative mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-8 sm:p-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < t.rating ? "fill-amber text-amber" : "text-[var(--line)]"}`}
                />
              ))}
            </div>
            <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-relaxed sm:text-2xl">
              “{t.review}”
            </p>
            <div className="mt-6">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-ink-soft">
                {t.city} · {t.loanType}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:bg-paper-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:bg-paper-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-2 flex gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-blue" : "w-1.5 bg-[var(--line)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
