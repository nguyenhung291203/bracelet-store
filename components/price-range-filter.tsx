"use client";

import { Slider } from "@/components/ui/slider";

type Props = {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export default function PriceRangeFilter({
  min = 0,
  max = 5_000_000,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-lg border bg-background text-foreground">
      <div className="border-b px-4 py-3 bg-muted">
        <h3 className="text-sm font-semibold uppercase">Giá</h3>
      </div>

      <div className="space-y-4 px-4 py-4">
        <Slider
          min={min}
          max={max}
          step={50_000}
          value={value}
          onValueChange={(v) => onChange(v as [number, number])}
        />

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
