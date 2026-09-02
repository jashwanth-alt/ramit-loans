"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Lead, LeadStatus, leadStatuses } from "@/lib/validations";
import { getLeads, updateLeadStatus } from "@/lib/leads-store";
import { formatINR } from "@/lib/utils";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | "ALL">("ALL");

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads(updateLeadStatus(id, status));
  };

  const filtered = filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Leads</h1>
          <p className="mt-2 text-sm text-ink-soft">Status changes are saved to your browser&apos;s local storage.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["ALL", ...leadStatuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === s
                ? "border-blue bg-blue text-white"
                : "border-[var(--line)] text-ink-soft hover:border-blue/40 hover:text-blue"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto thin-scroll rounded-2xl border border-[var(--line)] bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] bg-paper-2 text-left text-xs font-medium uppercase tracking-wide text-ink-soft">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Loan Type</th>
              <th className="px-5 py-3">Loan Amount</th>
              <th className="px-5 py-3">Employment</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="ledger-row">
                <td className="px-5 py-3.5 font-medium">{lead.fullName}</td>
                <td className="px-5 py-3.5 text-ink-soft">{lead.mobile}</td>
                <td className="px-5 py-3.5">{lead.loanType}</td>
                <td className="px-5 py-3.5">{formatINR(lead.loanAmount)}</td>
                <td className="px-5 py-3.5 text-ink-soft">{lead.employmentType}</td>
                <td className="px-5 py-3.5">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                    className="rounded-lg border border-[var(--line)] bg-paper px-2 py-1.5 text-xs font-medium outline-none focus:border-blue"
                  >
                    {leadStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3.5 text-ink-soft">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-ink-soft">No leads match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
