import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, forwardRef } from "react";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink-soft">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/15",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export function SelectField({
  label,
  error,
  id,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string } & {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full rounded-xl border border-[var(--line)] bg-white/80 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/15",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
