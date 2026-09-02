"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AmortizationYear } from "@/lib/emi";
import { formatINR } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function AmortizationTable({ schedule }: { schedule: AmortizationYear[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
      <div className="hidden grid-cols-6 gap-2 bg-paper-2 px-5 py-3 text-xs font-medium uppercase tracking-wide text-ink-soft sm:grid">
        <span>Year</span>
        <span>Opening Balance</span>
        <span>Principal Paid</span>
        <span>Interest Paid</span>
        <span>Total Payment</span>
        <span>Closing Balance</span>
      </div>

      <div className="max-h-[420px] overflow-y-auto thin-scroll">
        {schedule.map((row) => {
          const isOpen = expanded === row.year;
          return (
            <div key={row.year} className="ledger-row">
              <button
                onClick={() => setExpanded(isOpen ? null : row.year)}
                className="grid w-full grid-cols-2 items-center gap-2 px-5 py-3.5 text-left text-sm hover:bg-paper-2 sm:grid-cols-6"
              >
                <span className="font-medium">Year {row.year}</span>
                <span className="hidden text-ink-soft sm:block">{formatINR(row.openingBalance)}</span>
                <span className="hidden text-green sm:block">{formatINR(row.principalPaid)}</span>
                <span className="hidden text-cyan sm:block">{formatINR(row.interestPaid)}</span>
                <span className="hidden sm:block">{formatINR(row.totalPayment)}</span>
                <span className="flex items-center justify-between text-ink-soft sm:justify-start">
                  {formatINR(row.closingBalance)}
                  <ChevronDown className={`h-4 w-4 transition-transform sm:hidden ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden sm:hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 bg-paper-2 px-5 py-4 text-sm">
                      <Detail label="Opening Balance" value={formatINR(row.openingBalance)} />
                      <Detail label="Principal Paid" value={formatINR(row.principalPaid)} />
                      <Detail label="Interest Paid" value={formatINR(row.interestPaid)} />
                      <Detail label="Total Payment" value={formatINR(row.totalPayment)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
