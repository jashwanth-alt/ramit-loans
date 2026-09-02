import { z } from "zod";

export const employmentTypes = [
  "Salaried",
  "Self Employed",
  "Business Owner",
  "Professional",
] as const;

export const loanTypes = [
  "Personal Loan",
  "Home Loan",
  "Business Loan",
  "Car Loan",
  "Education Loan",
  "Loan Against Property",
] as const;

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "APPROVED",
  "REJECTED",
  "CONVERTED",
] as const;

export const stepOneSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email"),
  city: z.string().trim().min(2, "Enter your city"),
  employmentType: z.enum(employmentTypes, {
    message: "Select your employment type",
  }),
});

export const stepTwoSchema = z.object({
  loanType: z.enum(loanTypes, { message: "Select a loan type" }),
  loanAmount: z.coerce.number().min(10000, "Minimum loan amount is ₹10,000"),
  monthlyIncome: z.coerce.number().min(5000, "Enter your monthly income"),
  existingEmi: z.coerce.number().min(0, "Cannot be negative"),
  preferredTenure: z.coerce.number().min(1).max(30),
});

export const stepThreeSchema = z.object({
  companyName: z.string().trim().min(2, "Enter your company or business name"),
  yearsExperience: z.coerce.number().min(0).max(50),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}\d{4}[A-Z]$/, "Enter a valid PAN (e.g. ABCDE1234F)"),
});

export const applicationSchema = stepOneSchema
  .and(stepTwoSchema)
  .and(stepThreeSchema);

export type StepOneValues = z.infer<typeof stepOneSchema>;
export type StepTwoValues = z.infer<typeof stepTwoSchema>;
export type StepThreeValues = z.infer<typeof stepThreeSchema>;
export type ApplicationValues = StepOneValues & StepTwoValues & StepThreeValues;

export type LeadStatus = (typeof leadStatuses)[number];

export interface Lead extends ApplicationValues {
  id: string;
  status: LeadStatus;
  createdAt: string;
}
