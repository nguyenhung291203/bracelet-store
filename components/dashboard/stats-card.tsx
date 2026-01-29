// components/dashboard/stats-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  change: number;
};

export function StatsCard({
  title,
  value,
  icon,
  change,
}: StatsCardProps) {
  const isUp = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        <div className="flex items-center text-sm mt-1">
          {isUp ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}

          <span className={isUp ? "text-emerald-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>

          <span className="text-muted-foreground ml-1">
            so với tháng trước
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
