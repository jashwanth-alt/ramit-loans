"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LoanApplicationModal } from "./loan-application-modal";

interface LoanFormContextValue {
  open: (presetLoanType?: string) => void;
}

const LoanFormContext = createContext<LoanFormContextValue | null>(null);

export function LoanFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetLoanType, setPresetLoanType] = useState<string | undefined>();

  const open = useCallback((loanType?: string) => {
    setPresetLoanType(loanType);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LoanFormContext.Provider value={{ open }}>
      {children}
      <LoanApplicationModal
        isOpen={isOpen}
        onClose={close}
        presetLoanType={presetLoanType}
      />
    </LoanFormContext.Provider>
  );
}

export function useLoanForm() {
  const ctx = useContext(LoanFormContext);
  if (!ctx) {
    throw new Error("useLoanForm must be used within a LoanFormProvider");
  }
  return ctx;
}
