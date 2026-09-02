import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg" | "sm";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue text-white hover:bg-[#274fd1] shadow-[0_10px_24px_-10px_rgba(47,94,237,0.55)]",
  secondary:
    "bg-white text-ink border border-[var(--line)] hover:bg-paper-2",
  ghost: "text-ink hover:bg-black/5",
  "outline-light":
    "border border-white/35 text-white hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BaseProps {
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
