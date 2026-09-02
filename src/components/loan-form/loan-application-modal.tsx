"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, X } from "lucide-react";
import {
  ApplicationValues,
  employmentTypes,
  loanTypes,
  stepOneSchema,
  stepThreeSchema,
  stepTwoSchema,
} from "@/lib/validations";
import { Input, SelectField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addLead } from "@/lib/leads-store";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  presetLoanType?: string;
}

const TOTAL_STEPS = 3;

const defaultValues: Partial<ApplicationValues> = {
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  loanAmount: 500000,
  monthlyIncome: 0,
  existingEmi: 0,
  preferredTenure: 5,
  companyName: "",
  yearsExperience: 1,
  pincode: "",
  pan: "",
};

export function LoanApplicationModal({ isOpen, onClose, presetLoanType }: Props) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState<ApplicationValues | null>(null);
  const router = useRouter();

  const schema = useMemo(() => {
    if (step === 1) return stepOneSchema;
    if (step === 2) return stepTwoSchema;
    return stepThreeSchema;
  }, [step]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema) as unknown as Resolver<Record<string, unknown>>,
    defaultValues: { ...defaultValues, loanType: presetLoanType ?? loanTypes[0] },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(null);
      reset({ ...defaultValues, loanType: presetLoanType ?? loanTypes[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, presetLoanType]);

  const [formData, setFormData] = useState<Partial<ApplicationValues>>({});

  const onNext = async (data: Record<string, unknown>) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      reset(merged, { keepValues: false });
    } else {
      addLead(merged as ApplicationValues);
      setSubmitted(merged as ApplicationValues);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto thin-scroll rounded-3xl glass p-6 sm:p-8"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full p-1.5 text-ink-soft hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <SuccessScreen name={submitted.fullName} onClose={onClose} router={router} />
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm font-medium text-blue">
                  Step {step} of {TOTAL_STEPS}
                </p>
                <div className="mt-3 flex gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i < step ? "bg-blue" : "bg-black/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  onSubmit={handleSubmit(onNext)}
                  className="space-y-4"
                >
                  {step === 1 && (
                    <>
                      <h3 className="font-display text-xl font-semibold">A few basics</h3>
                      <Input label="Full Name" placeholder="Jashwanth Reddy" {...register("fullName")} error={errors.fullName?.message as string} />
                      <Input label="Mobile Number" placeholder="98765 43210" {...register("mobile")} error={errors.mobile?.message as string} />
                      <Input label="Email" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message as string} />
                      <Input label="City" placeholder="Hyderabad" {...register("city")} error={errors.city?.message as string} />
                      <SelectField label="Employment Type" {...register("employmentType")} error={errors.employmentType?.message as string}>
                        <option value="">Select employment type</option>
                        {employmentTypes.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </SelectField>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="font-display text-xl font-semibold">About the loan</h3>
                      <SelectField label="Loan Type" {...register("loanType")} error={errors.loanType?.message as string}>
                        {loanTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </SelectField>
                      <Input label="Loan Amount (₹)" type="number" {...register("loanAmount")} error={errors.loanAmount?.message as string} />
                      <Input label="Monthly Income (₹)" type="number" {...register("monthlyIncome")} error={errors.monthlyIncome?.message as string} />
                      <Input label="Existing EMI (₹)" type="number" {...register("existingEmi")} error={errors.existingEmi?.message as string} />
                      <Input label="Preferred Tenure (years)" type="number" {...register("preferredTenure")} error={errors.preferredTenure?.message as string} />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h3 className="font-display text-xl font-semibold">Almost done</h3>
                      <Input label="Company / Business Name" {...register("companyName")} error={errors.companyName?.message as string} />
                      <Input label="Years of Experience" type="number" {...register("yearsExperience")} error={errors.yearsExperience?.message as string} />
                      <Input label="Pincode" {...register("pincode")} error={errors.pincode?.message as string} />
                      <Input label="PAN Number" placeholder="ABCDE1234F" {...register("pan")} error={errors.pan?.message as string} />
                      <p className="text-xs text-ink-soft">
                        This is demo data for the MVP — nothing is sent or stored outside your browser.
                      </p>
                    </>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    {step > 1 && (
                      <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
                        Back
                      </Button>
                    )}
                    <Button type="submit" className="flex-1">
                      {step < TOTAL_STEPS ? "Continue" : "Submit Application"}
                    </Button>
                  </div>
                </motion.form>
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SuccessScreen({
  name,
  onClose,
  router,
}: {
  name: string;
  onClose: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green/10"
      >
        <CheckCircle2 className="h-9 w-9 text-green" />
      </motion.div>
      <h3 className="font-display text-2xl font-semibold">Application Received!</h3>
      <p className="mt-3 text-ink-soft">
        Thank you, {name.split(" ")[0]}.
      </p>
      <p className="mt-1 text-ink-soft">
        Your loan assistance request has been submitted successfully.
        <br />A loan specialist will contact you shortly.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={onClose}>
          Back to Home
        </Button>
        <Button
          onClick={() => {
            onClose();
            router.push("/emi-calculator");
          }}
        >
          Calculate EMI
        </Button>
      </div>
    </motion.div>
  );
}
