import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(value: number, options?: { compact?: boolean }): string {
  if (!Number.isFinite(value)) return "₹0";
  if (options?.compact) {
    if (value >= 1_00_00_000) return `₹${trimZero(value / 1_00_00_000)}Cr`;
    if (value >= 1_00_000) return `₹${trimZero(value / 1_00_000)}L`;
    if (value >= 1_000) return `₹${trimZero(value / 1_000)}K`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function trimZero(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

export function formatNumberIN(value: number): string {
  return new Intl.NumberFormat("en-IN").format(Math.round(value));
}
