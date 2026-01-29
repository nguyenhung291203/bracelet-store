// components/admin/sales-chart.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "T2", revenue: 12000000 },
  { date: "T3", revenue: 15000000 },
  { date: "T4", revenue: 18000000 },
  { date: "T5", revenue: 14000000 },
  { date: "T6", revenue: 22000000 },
  { date: "T7", revenue: 25000000 },
  { date: "CN", revenue: 30000000 },
];

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "#3b82f6", // Tailwind blue-500
  },
} satisfies ChartConfig;

export default function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu 7 ngày qua</CardTitle>
        <CardDescription>
          Thống kê doanh thu từ thứ 2 đến chủ nhật
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tăng 12.5% so với tuần trước <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Tổng doanh thu: 136,000,000 VNĐ
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
