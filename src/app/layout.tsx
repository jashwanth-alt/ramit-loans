import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { LoanFormProvider } from "@/components/loan-form/form-context";

export const metadata: Metadata = {
  title: {
    default: "Ramit Loans — Find the Right Loan, Get the Right Guidance",
    template: "%s | Ramit Loans",
  },
  description:
    "Compare personal, home, business, car, education and property loans from 25+ lending partners, calculate your EMI instantly, and get guided assistance end to end.",
  openGraph: {
    title: "Ramit Loans — Find the Right Loan, Get the Right Guidance",
    description: "Compare loans from 25+ lending partners, calculate your EMI instantly, and get guided assistance end to end.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LoanFormProvider>
          <Navbar />
          <main className="pt-[92px]">{children}</main>
          <Footer />
        </LoanFormProvider>
      </body>
    </html>
  );
}
