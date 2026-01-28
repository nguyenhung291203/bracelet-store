"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
};

export default function PriceRangeFilter({
  min = 0,
  max = 5_000_000,
}: Props) {
  const [value, setValue] = useState<[number, number]>([
    min,
    max,
  ]);

  return (
    <div className="rounded-lg border bg-background text-foreground">
      {/* Header */}
      <div className="border-b px-4 py-3 bg-muted">
        <h3 className="text-sm font-semibold uppercase">
          Giá
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-4 px-4 py-4">
        {/* Slider */}
        <Slider
          min={min}
          max={max}
          step={50_000}
          value={value}
          onValueChange={(v) => setValue(v as [number, number])}
        />

        {/* Price display */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {value[0].toLocaleString()}₫
          </span>
          <span className="text-muted-foreground">
            {value[1].toLocaleString()}₫
          </span>
        </div>

      </div>
    </div>
  );
}
