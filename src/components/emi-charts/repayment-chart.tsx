"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AmortizationYear } from "@/lib/emi";
import { formatINR } from "@/lib/utils";

export function RepaymentChart({ schedule }: { schedule: AmortizationYear[] }) {
  const data = schedule.map((y) => ({
    year: `Y${y.year}`,
    Principal: Math.round(y.principalPaid),
    Interest: Math.round(y.interestPaid),
    Balance: Math.round(y.closingBalance),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="rgba(10,15,44,0.08)" />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            interval={data.length > 12 ? Math.ceil(data.length / 10) : 0}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(v) => formatINR(v, { compact: true })}
            width={56}
          />
          <Tooltip
            formatter={(value, name) => [formatINR(Number(value)), String(name)]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(10,15,44,0.1)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="Principal" stackId="a" fill="#2f5eed" radius={[0, 0, 0, 0]} isAnimationActive animationDuration={500} />
          <Bar dataKey="Interest" stackId="a" fill="#1fd1e0" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
