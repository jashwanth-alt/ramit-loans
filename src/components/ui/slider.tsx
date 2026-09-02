"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  trackColor?: string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
  trackColor = "var(--blue)",
}: SliderProps) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={cn("emi-slider w-full", className)}
      style={
        {
          background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${pct}%, rgba(10,15,44,0.1) ${pct}%, rgba(10,15,44,0.1) 100%)`,
        } as React.CSSProperties
      }
    />
  );
}
