"use client";

import { ApplicationValues, Lead, LeadStatus } from "./validations";

const STORAGE_KEY = "finlace_mock_leads_v1";

const seedNames = [
  "Rahul Verma",
  "Ananya Reddy",
  "Vikram Singh",
  "Priya Nair",
  "Karan Malhotra",
  "Sneha Joshi",
];

function seedLeads(): Lead[] {
  const loanTypes: Lead["loanType"][] = [
    "Personal Loan",
    "Home Loan",
    "Business Loan",
    "Car Loan",
    "Education Loan",
    "Loan Against Property",
  ];
  const employment: Lead["employmentType"][] = ["Salaried", "Self Employed", "Business Owner", "Professional"];
  const statuses: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "APPROVED", "REJECTED", "CONVERTED"];

  return seedNames.map((name, i) => {
    const daysAgo = (i + 1) * 2;
    const created = new Date();
    created.setDate(created.getDate() - daysAgo);
    return {
      id: `seed-${i}`,
      fullName: name,
      mobile: `9${(800000000 + i * 111111).toString().slice(0, 9)}`,
      email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      city: ["Mumbai", "Bengaluru", "Delhi", "Pune", "Chennai", "Hyderabad"][i],
      employmentType: employment[i % employment.length],
      loanType: loanTypes[i % loanTypes.length],
      loanAmount: 200000 + i * 150000,
      monthlyIncome: 40000 + i * 8000,
      existingEmi: i % 2 === 0 ? 0 : 5000,
      preferredTenure: [3, 15, 4, 5, 8, 10][i],
      companyName: ["Infosys", "Self-employed", "Sharma Traders", "TCS", "Freelance", "Wipro"][i],
      yearsExperience: 2 + i,
      pincode: `${400001 + i * 1000}`,
      pan: `ABCDE${1000 + i}F`,
      status: statuses[i],
      createdAt: created.toISOString(),
    };
  });
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedLeads();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function addLead(values: ApplicationValues): Lead {
  const lead: Lead = {
    ...values,
    id: `lead-${Date.now()}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  const leads = getLeads();
  const updated = [lead, ...leads];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead[] {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return leads;
}
