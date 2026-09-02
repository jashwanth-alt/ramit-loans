import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLoanBySlug } from "@/data/mockData";
import { LoanDetailPage } from "@/components/loan-details/loan-detail-page";

const loan = getLoanBySlug("business-loan")!;

export const metadata: Metadata = {
  title: loan.name,
  description: loan.description,
};

export default function Page() {
  if (!loan) return notFound();
  return <LoanDetailPage loan={loan} />;
}
