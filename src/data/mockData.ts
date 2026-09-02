// Centralized mock data for the MVP. Nothing here is a real offer or a real
// customer — everything is illustrative demo content for the frontend build.

export interface LoanProduct {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  interestRateLabel: string;
  interestRateMin: number;
  amountLabel: string;
  amountMin: number;
  amountMax: number;
  tenureLabel: string;
  tenureMaxYears: number;
  benefits: string[];
  cardPoints: string[];
  eligibility: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
  accent: "blue" | "purple" | "cyan" | "green" | "amber";
}

export const loanProducts: LoanProduct[] = [
  {
    slug: "personal-loan",
    name: "Personal Loan",
    shortName: "Personal",
    tagline: "Funding for the things that matter.",
    description:
      "An unsecured loan for weddings, travel, medical needs or any personal expense — no collateral required, disbursed fast.",
    interestRateLabel: "10.5% – 24%",
    interestRateMin: 10.5,
    amountLabel: "₹50,000 – ₹25 Lakh",
    amountMin: 50000,
    amountMax: 2500000,
    tenureLabel: "1 – 7 Years",
    tenureMaxYears: 7,
    benefits: ["Quick processing", "Flexible tenure", "Competitive rates", "No collateral needed"],
    cardPoints: ["Quick processing", "Flexible tenure", "Competitive rates"],
    eligibility: [
      "Age between 21–60 years",
      "Minimum monthly income of ₹20,000",
      "At least 1 year of work experience",
      "Credit score of 700 or above preferred",
    ],
    documents: ["PAN card", "Aadhaar card", "Last 3 months' salary slips", "Bank statement (6 months)"],
    faqs: [
      { q: "How fast can a personal loan be disbursed?", a: "For most applicants with complete documents, lending partners typically disburse within 2–5 working days." },
      { q: "Is collateral required?", a: "No, personal loans in this MVP are modeled as unsecured — no asset or guarantor is required." },
    ],
    accent: "blue",
  },
  {
    slug: "home-loan",
    name: "Home Loan",
    shortName: "Home",
    tagline: "A place of your own, financed sensibly.",
    description:
      "Long-tenure financing to buy, build or renovate your home, with repayment stretched comfortably over the years.",
    interestRateLabel: "8.2% – 12%",
    interestRateMin: 8.2,
    amountLabel: "₹5 Lakh – ₹5 Crore",
    amountMin: 500000,
    amountMax: 50000000,
    tenureLabel: "5 – 30 Years",
    tenureMaxYears: 30,
    benefits: ["High loan amount", "Long tenure", "Flexible repayment", "Balance transfer available"],
    cardPoints: ["High loan amount", "Long tenure", "Flexible repayment"],
    eligibility: [
      "Age between 21–65 years",
      "Stable income source (salaried or self-employed)",
      "Property must meet lending partner's technical & legal checks",
    ],
    documents: ["PAN & Aadhaar", "Income proof / ITR", "Property documents", "Bank statement (6 months)"],
    faqs: [
      { q: "Can I prepay my home loan?", a: "Most floating-rate home loans in this model allow part-prepayment without extra charges." },
      { q: "Is a co-applicant required?", a: "Not mandatory, but adding one can improve eligibility for a higher loan amount." },
    ],
    accent: "green",
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    shortName: "Business",
    tagline: "Capital to grow on your terms.",
    description:
      "Working capital and expansion funding for small and medium businesses — structured around your cash flow.",
    interestRateLabel: "11% – 22%",
    interestRateMin: 11,
    amountLabel: "₹1 Lakh – ₹75 Lakh",
    amountMin: 100000,
    amountMax: 7500000,
    tenureLabel: "1 – 5 Years",
    tenureMaxYears: 5,
    benefits: ["Business expansion", "Working capital", "Flexible repayment", "Minimal collateral"],
    cardPoints: ["Business expansion", "Working capital", "Flexible repayment"],
    eligibility: [
      "Business vintage of at least 2 years",
      "Minimum annual turnover as per lending partner norms",
      "GST registration where applicable",
    ],
    documents: ["Business PAN", "GST returns", "Bank statement (12 months)", "Financial statements"],
    faqs: [
      { q: "Do new businesses qualify?", a: "Most lending partners in this model prefer at least 2 years of vintage, though some offer startup-focused lines." },
      { q: "Is a personal guarantee needed?", a: "Depending on the loan size, a personal guarantee from the proprietor/director may be requested." },
    ],
    accent: "amber",
  },
  {
    slug: "car-loan",
    name: "Car Loan",
    shortName: "Car",
    tagline: "Drive away sooner, pay comfortably.",
    description:
      "Finance a new or used car with quick approvals and repayment plans that fit your monthly budget.",
    interestRateLabel: "9% – 14%",
    interestRateMin: 9,
    amountLabel: "₹1 Lakh – ₹1 Crore",
    amountMin: 100000,
    amountMax: 10000000,
    tenureLabel: "1 – 7 Years",
    tenureMaxYears: 7,
    benefits: ["New & used cars", "Flexible tenure", "Easy application", "Up to 90% financing"],
    cardPoints: ["New & used cars", "Flexible tenure", "Easy application"],
    eligibility: ["Age between 21–65 years", "Minimum monthly income of ₹25,000", "Valid driving license (for used cars)"],
    documents: ["PAN & Aadhaar", "Income proof", "Vehicle quotation / RC (for used cars)"],
    faqs: [
      { q: "Can I finance a used car?", a: "Yes, this model covers both new and pre-owned vehicles, typically at a slightly higher rate for used cars." },
      { q: "What's the typical down payment?", a: "Illustratively, 10–25% of the on-road price depending on the vehicle and lender." },
    ],
    accent: "cyan",
  },
  {
    slug: "education-loan",
    name: "Education Loan",
    shortName: "Education",
    tagline: "Invest in learning, repay after you earn.",
    description:
      "Covers tuition, hostel and other costs for higher education in India or abroad, with moratorium options.",
    interestRateLabel: "9.5% – 13.5%",
    interestRateMin: 9.5,
    amountLabel: "₹50,000 – ₹1.5 Crore",
    amountMin: 50000,
    amountMax: 15000000,
    tenureLabel: "5 – 15 Years",
    tenureMaxYears: 15,
    benefits: ["Higher education funding", "Flexible repayment", "Moratorium during study", "Covers India & abroad"],
    cardPoints: ["Higher education funding", "Flexible repayment"],
    eligibility: ["Admission confirmation from a recognised institute", "Co-applicant (usually parent) required", "Course-specific eligibility criteria"],
    documents: ["Admission letter", "Fee structure", "Co-applicant income proof", "Academic records"],
    faqs: [
      { q: "When does repayment start?", a: "Typically after a moratorium period covering the course duration plus 6–12 months." },
      { q: "Are living expenses covered?", a: "Many lending partners include hostel and living costs within the sanctioned amount." },
    ],
    accent: "purple",
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    shortName: "LAP",
    tagline: "Unlock the value of what you already own.",
    description:
      "Use residential or commercial property as collateral to raise high-value funds at relatively lower rates.",
    interestRateLabel: "9% – 14.5%",
    interestRateMin: 9,
    amountLabel: "₹5 Lakh – ₹10 Crore",
    amountMin: 500000,
    amountMax: 100000000,
    tenureLabel: "5 – 20 Years",
    tenureMaxYears: 20,
    benefits: ["High-value financing", "Flexible tenure", "Lower interest vs unsecured loans", "Property continues in use"],
    cardPoints: ["High-value financing", "Flexible tenure"],
    eligibility: ["Clear property title", "Property within lending partner's approved locations", "Stable income to support EMI"],
    documents: ["Property title documents", "PAN & Aadhaar", "Income proof", "Property tax receipts"],
    faqs: [
      { q: "Can I still use the property?", a: "Yes, you continue to own and use the property; it is only pledged as collateral." },
      { q: "What loan-to-value can I expect?", a: "Illustratively, up to 60–70% of the property's market value." },
    ],
    accent: "blue",
  },
];


export const trustStats = [
  { label: "Customers Assisted", value: 10000, suffix: "+", prefix: "" },
  { label: "Loans Facilitated", value: 100, suffix: "Cr+", prefix: "₹" },
  { label: "Lending Partners", value: 25, suffix: "+", prefix: "" },
  { label: "Customer Satisfaction", value: 95, suffix: "%", prefix: "" },
];

export const howItWorks = [
  { step: "01", title: "Tell Us Your Requirement", description: "Share the loan type, amount and a few basic details — takes under two minutes." },
  { step: "02", title: "Explore Suitable Options", description: "We match your profile against lending partners and surface the offers worth considering." },
  { step: "03", title: "Choose Your Loan", description: "Compare rates and terms side by side, then pick the option that fits you best." },
  { step: "04", title: "Get Assistance Until Disbursement", description: "A loan specialist stays with you through documentation, approval and disbursal." },
];

export const whyChooseUs = [
  { title: "Multiple Lending Partners", description: "Access to 25+ banks and NBFCs from a single application.", icon: "Landmark" },
  { title: "Personalized Guidance", description: "Recommendations based on your income, credit profile and goals.", icon: "UserCheck" },
  { title: "Transparent Process", description: "Clear terms, no hidden charges, and honest comparisons.", icon: "ShieldCheck" },
  { title: "Quick Assistance", description: "Specialists respond fast so you're never left waiting.", icon: "Zap" },
  { title: "Simple Documentation", description: "A short, clearly explained checklist — nothing buried in fine print.", icon: "FileCheck2" },
  { title: "End-to-End Support", description: "From application to disbursement, we stay involved.", icon: "Handshake" },
];

export const testimonials = [
  { name: "Ritika Sharma", city: "Pune", loanType: "Home Loan", rating: 5, review: "The EMI calculator made it easy to plan before I even applied. The whole process felt transparent from start to finish." },
  { name: "Arvind Menon", city: "Bengaluru", loanType: "Business Loan", rating: 5, review: "Compared multiple lenders in one place and got matched with a working capital option that actually suited my cash flow." },
  { name: "Neha Kulkarni", city: "Mumbai", loanType: "Personal Loan", rating: 4, review: "Straightforward application and the specialist explained every fee upfront. No surprises at disbursal." },
  { name: "Suresh Iyer", city: "Chennai", loanType: "Car Loan", rating: 5, review: "Got a used-car loan sorted in a few days. The comparison table for interest rates was genuinely useful." },
  { name: "Fatima Sheikh", city: "Hyderabad", loanType: "Education Loan", rating: 5, review: "As a co-applicant parent, the moratorium details being spelled out clearly gave me real peace of mind." },
];

export const generalFaqs = [
  { q: "How is EMI calculated?", a: "EMI is computed on your principal, interest rate and tenure using the standard reducing-balance formula, so a larger part of early payments goes toward interest and a larger part of later payments goes toward principal." },
  { q: "What documents are usually required?", a: "Typically PAN, Aadhaar, income proof and bank statements — the exact list depends on the loan type and is shown on each loan's page." },
  { q: "Does checking eligibility affect credit score?", a: "In this model, an initial eligibility check is treated as a soft enquiry and does not affect your credit score." },
  { q: "How long can loan processing take?", a: "Illustratively, 2–7 working days once all documents are submitted, depending on the loan type and lender." },
  { q: "Can self-employed people apply?", a: "Yes — self-employed professionals and business owners can apply, usually with additional income documentation." },
  { q: "How does loan interest work?", a: "Interest accrues on the outstanding balance each month; as you repay principal, the interest portion of future EMIs decreases." },
];

export const employmentOptions = ["Salaried", "Self Employed", "Business Owner", "Professional"] as const;

export function getLoanBySlug(slug: string) {
  return loanProducts.find((l) => l.slug === slug);
}
export interface BankPartner {
  name: string;
  short: string;
  initials: string;
  accent: string;
  mark: "shield" | "arc" | "diamond" | "chevron" | "peak" | "leaf";
}

export const bankPartners: BankPartner[] = [
  { name: "HDFC Bank", short: "HDFC", initials: "HDFC", accent: "#c0272d", mark: "shield" },
  { name: "ICICI Bank", short: "ICICI", initials: "ICICI", accent: "#b45309", mark: "arc" },
  { name: "Axis Bank", short: "Axis", initials: "AXIS", accent: "#6d28d9", mark: "diamond" },
  { name: "SBI", short: "SBI", initials: "SBI", accent: "#1d4ed8", mark: "chevron" },
  { name: "Kotak Mahindra", short: "Kotak", initials: "KM", accent: "#dc2626", mark: "peak" },
  { name: "IndusInd Bank", short: "IndusInd", initials: "IB", accent: "#0f766e", mark: "leaf" },
  { name: "IDFC FIRST Bank", short: "IDFC FIRST", initials: "IF", accent: "#7c2d92", mark: "shield" },
  { name: "Bajaj Finserv", short: "Bajaj Finserv", initials: "BF", accent: "#1e3a8a", mark: "arc" },
  { name: "Yes Bank", short: "Yes Bank", initials: "YB", accent: "#0369a1", mark: "chevron" },
  { name: "Federal Bank", short: "Federal", initials: "FB", accent: "#065f46", mark: "leaf" },
];
