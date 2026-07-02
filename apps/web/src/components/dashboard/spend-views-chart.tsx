"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DailyPerformance } from "@/lib/mock-data";

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const baht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export function SpendViewsChart({ data }: { data: DailyPerformance[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 18, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e4e4e7" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            yAxisId="views"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            tickFormatter={(value) => compactNumber.format(Number(value))}
            width={46}
          />
          <YAxis
            yAxisId="spend"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            tickFormatter={(value) => `฿${compactNumber.format(Number(value))}`}
            width={52}
          />
          <Tooltip
            cursor={{ stroke: "#a1a1aa", strokeDasharray: "4 4" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
              fontSize: 12,
            }}
            formatter={(value, name) => {
              if (name === "spend") {
                return [baht.format(Number(value)), "Spend"];
              }

              return [compactNumber.format(Number(value)), "Views"];
            }}
            labelStyle={{ color: "#18181b", fontWeight: 600 }}
          />
          <Area
            yAxisId="views"
            type="monotone"
            dataKey="views"
            stroke="#0891b2"
            strokeWidth={2}
            fill="url(#viewsFill)"
            name="views"
          />
          <Area
            yAxisId="spend"
            type="monotone"
            dataKey="spend"
            stroke="#e11d48"
            strokeWidth={2}
            fill="url(#spendFill)"
            name="spend"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
