import { Lead } from "@/lib/validations";

const colors: Record<Lead["status"], string> = {
  NEW: "bg-blue/10 text-blue",
  CONTACTED: "bg-amber/10 text-amber",
  QUALIFIED: "bg-purple/10 text-purple",
  APPROVED: "bg-cyan/10 text-cyan",
  REJECTED: "bg-red-100 text-red-500",
  CONVERTED: "bg-green/10 text-green",
};

export function StatusPill({ status }: { status: Lead["status"] }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}
