"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatINR } from "@/lib/utils";

interface Props {
  principal: number;
  interest: number;
}

export function PrincipalInterestDonut({ principal, interest }: Props) {
  const data = [
    { name: "Principal Amount", value: Math.round(principal) },
    { name: "Total Interest", value: Math.round(interest) },
  ];
  const colors = ["#2f5eed", "#1fd1e0"];

  return (
    <div className="relative h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="92%"
            paddingAngle={3}
            cornerRadius={8}
            startAngle={90}
            endAngle={-270}
            isAnimationActive
            animationDuration={600}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatINR(Number(value))}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(10,15,44,0.1)",
              fontSize: 13,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-ink-soft">Total Payable</p>
        <p className="font-display text-lg font-bold">{formatINR(principal + interest, { compact: true })}</p>
      </div>
    </div>
  );
}
