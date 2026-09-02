"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Landmark, Menu, Phone, X } from "lucide-react";
import { loanProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useLoanForm } from "@/components/loan-form/form-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);
  const { open } = useLoanForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300 sm:pl-5 ${
          scrolled
            ? "border-white/70 bg-white/85 shadow-[0_12px_36px_-16px_rgba(10,15,44,0.28)]"
            : "border-white/50 bg-white/65 shadow-[0_8px_28px_-16px_rgba(10,15,44,0.18)]"
        } backdrop-blur-xl`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-cyan text-white">
            <Landmark className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold text-ink">Ramit Loans</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <NavItem href="/">Home</NavItem>
          <div className="relative" onMouseEnter={() => setLoansOpen(true)} onMouseLeave={() => setLoansOpen(false)}>
            <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:bg-black/5 hover:text-ink">
              Loans
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {loansOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-1/2 top-full mt-3 grid w-[560px] -translate-x-1/2 grid-cols-2 gap-1 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-[0_24px_60px_-20px_rgba(10,15,44,0.3)] backdrop-blur-xl"
                >
                  {loanProducts.map((loan) => (
                    <Link key={loan.slug} href={`/${loan.slug}`} className="rounded-2xl p-3 transition-colors hover:bg-black/5">
                      <p className="text-[15px] font-medium text-ink">{loan.name}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">{loan.interestRateLabel}</p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavItem href="/emi-calculator">EMI Calculator</NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => open()}>
            Check Eligibility
          </Button>
          <button
            className="rounded-full p-2 text-ink lg:hidden"
            onClick={() => {
              setMobileOpen((v) => !v);
              setMobileLoansOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_20px_50px_-20px_rgba(10,15,44,0.28)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-ink hover:bg-black/5">
                Home
              </Link>
              <Link
                href="/emi-calculator"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-ink hover:bg-black/5"
              >
                EMI Calculator
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-ink hover:bg-black/5">
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-ink hover:bg-black/5">
                Contact
              </Link>

              <button
                onClick={() => setMobileLoansOpen((v) => !v)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-ink hover:bg-black/5"
                aria-expanded={mobileLoansOpen}
              >
                Loans
                <ChevronDown className={`h-4 w-4 text-ink-soft transition-transform duration-200 ${mobileLoansOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {mobileLoansOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pb-1 pl-2">
                      {loanProducts.map((loan) => (
                        <Link
                          key={loan.slug}
                          href={`/${loan.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:bg-black/5 hover:text-ink"
                        >
                          {loan.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                className="mt-3"
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
              >
                Check Eligibility
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-3.5 py-2 text-sm text-ink-soft transition-colors hover:bg-black/5 hover:text-ink">
      {children}
    </Link>
  );
}
