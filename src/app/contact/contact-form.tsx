"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-[var(--line)] bg-white p-12 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-green" />
        <p className="mt-4 font-display text-xl font-semibold">Message sent</p>
        <p className="mt-2 text-sm text-ink-soft">We&apos;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full Name" placeholder="Your name" required />
        <Input label="Mobile Number" placeholder="98765 43210" required />
      </div>
      <Input label="Email" type="email" placeholder="you@example.com" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-soft">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us what you need help with"
          className="w-full rounded-xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[15px] outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/15"
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
