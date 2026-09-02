"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { trustStats } from "@/data/mockData";

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="border-y border-white/10 bg-navy-2">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
        {trustStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-sm text-white/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
