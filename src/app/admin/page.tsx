"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, UserCheck, UserPlus, Users } from "lucide-react";
import { Lead } from "@/lib/validations";
import { getLeads } from "@/lib/leads-store";
import { formatINR } from "@/lib/utils";
import { StatusPill } from "@/components/admin/status-pill";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "NEW").length;
  const contacted = leads.filter((l) => l.status === "CONTACTED").length;
  const converted = leads.filter((l) => l.status === "CONVERTED").length;
  const totalPipeline = leads.reduce((sum, l) => sum + l.loanAmount, 0);

  const cards = [
    { label: "Total Leads", value: total, icon: Users, accent: "text-blue", bg: "bg-blue/10" },
    { label: "New Leads", value: newLeads, icon: UserPlus, accent: "text-cyan", bg: "bg-cyan/10" },
    { label: "Contacted", value: contacted, icon: TrendingUp, accent: "text-amber", bg: "bg-amber/10" },
    { label: "Converted", value: converted, icon: UserCheck, accent: "text-green", bg: "bg-green/10" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue">Admin (demo)</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-sm text-ink-soft">
            No authentication or database — leads are mock data stored in your browser.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 rounded-full bg-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-[#274fd1]"
        >
          View All Leads <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-3xl border border-[var(--line)] bg-white p-6">
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.bg} ${c.accent}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-bold">{c.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-[var(--line)] bg-white p-6">
        <p className="text-sm text-ink-soft">Total Loan Amount in Pipeline</p>
        <p className="mt-1 font-display text-2xl font-bold">{formatINR(totalPipeline)}</p>
      </div>

      <div className="mt-10">
        <p className="mb-4 font-display text-lg font-semibold">Recent Leads</p>
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="ledger-row flex items-center justify-between px-5 py-4 text-sm">
              <div>
                <p className="font-medium">{lead.fullName}</p>
                <p className="text-xs text-ink-soft">{lead.loanType} · {formatINR(lead.loanAmount)}</p>
              </div>
              <StatusPill status={lead.status} />
            </div>
          ))}
          {leads.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-ink-soft">No leads yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
