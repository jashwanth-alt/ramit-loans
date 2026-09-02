"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { formatINR } from "@/lib/utils";

export function AnimatedAmount({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span className={className}>{formatINR(display)}</span>;
}
