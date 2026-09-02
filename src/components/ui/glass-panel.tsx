import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function GlassPanel({
  className,
  dark,
  ...props
}: HTMLAttributes<HTMLDivElement> & { dark?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        dark ? "glass-dark" : "glass",
        className
      )}
      {...props}
    />
  );
}
