import Link from "next/link";
import { Landmark } from "lucide-react";
import { loanProducts } from "@/data/mockData";

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-cyan text-white">
                <Landmark className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold text-white">Finlace</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A guided loan marketplace connecting you with 25+ lending partners — compare, calculate and apply in one place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Loans</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {loanProducts.map((loan) => (
                <li key={loan.slug}>
                  <Link href={`/${loan.slug}`} className="hover:text-white">
                    {loan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/emi-calculator" className="hover:text-white">EMI Calculator</Link></li>
              <li><Link href="/admin" className="hover:text-white">Admin (demo)</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Reach Us</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>hello@finlace.example</li>
              <li>+91 90000 00000</li>
              <li>Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Finlace. Demo MVP — all rates and figures are illustrative.</p>
          <p>Finlace is a loan-assistance platform, not a lender. All loans are disbursed by partner banks/NBFCs.</p>
        </div>
      </div>
    </footer>
  );
}
