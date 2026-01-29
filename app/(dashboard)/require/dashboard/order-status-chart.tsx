// components/admin/order-status-chart.tsx
"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
  { status: "completed", count: 128, fill: "var(--color-completed)" },
  { status: "processing", count: 84, fill: "var(--color-processing)" },
  { status: "pending", count: 33, fill: "var(--color-pending)" },
];

const chartConfig = {
  count: {
    label: "Số đơn",
  },
  completed: {
    label: "Hoàn thành",
    color: "hsl(var(--chart-1))",
  },
  processing: {
    label: "Đang xử lý",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Chờ xác nhận",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function OrderStatusChart() {
  const totalOrders = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Trạng thái đơn hàng</CardTitle>
        <CardDescription>Tháng này</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Đơn hàng
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hiển thị tổng đơn hàng trong tháng
        </div>
      </CardFooter>
    </Card>
  );
}