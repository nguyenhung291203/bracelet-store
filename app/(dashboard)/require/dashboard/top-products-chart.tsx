// components/admin/top-products-chart.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { product: "Thạch anh", sold: 45 },
  { product: "Bạc 925", sold: 38 },
  { product: "Gỗ trầm", sold: 32 },
  { product: "Phong thủy", sold: 28 },
  { product: "Ngọc bích", sold: 25 },
];

const chartConfig = {
  sold: {
    label: "Đã bán",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TopProductsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm bán chạy</CardTitle>
        <CardDescription>Top 5 sản phẩm trong tháng này</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="product"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sold" fill="var(--color-sold)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tăng 8.2% so với tháng trước <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tổng 168 sản phẩm đã bán
        </div>
      </CardFooter>
    </Card>
  );
}