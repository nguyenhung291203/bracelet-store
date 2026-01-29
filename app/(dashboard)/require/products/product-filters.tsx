"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

export default function ProductFilters() {
  return (
    <div className="flex justify-between">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search name */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm theo tên sản phẩm..." className="pl-9" />
        </div>

        {/* Category */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="1">Vòng tay</SelectItem>
            <SelectItem value="2">Phụ kiện</SelectItem>
            <SelectItem value="3">Phong thủy</SelectItem>
          </SelectContent>
        </Select>

        {/* Price */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Khoảng giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="0-200000">Dưới 200k</SelectItem>
            <SelectItem value="200000-500000">200k – 500k</SelectItem>
            <SelectItem value="500000-1000000">500k – 1tr</SelectItem>
            <SelectItem value="1000000+">Trên 1tr</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="price-asc">Giá tăng dần</SelectItem>
            <SelectItem value="price-desc">Giá giảm dần</SelectItem>
            <SelectItem value="sold">Bán chạy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
