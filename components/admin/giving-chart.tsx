"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAdminStore } from "@/lib/admin/store";

export function GivingChart() {
  const donations = useAdminStore((s) => s.donations);

  // bucket by week
  const byDay = new Map<string, number>();
  for (const d of donations) {
    const day = d.createdAt.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + d.amount);
  }
  const data = Array.from(byDay.entries())
    .map(([day, total]) => ({
      day: new Date(day).toLocaleString("en-US", { month: "short", day: "numeric" }),
      total,
    }))
    .reverse();

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={{
              background: "#0A0A0A",
              border: "none",
              borderRadius: 12,
              color: "white",
              fontSize: 12,
            }}
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "Giving"]}
          />
          <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} fill="url(#g)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
