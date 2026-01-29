import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Product } from "@/types/product.type";

interface Props {
  products: Product[];
}
export default function ListProduct({ products }: Props) {
  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Tồn kho</TableHead>
            <TableHead>Đánh giá</TableHead>
            <TableHead>Đã bán</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: Product) => {
            const prices = product.variants.map((v) => v.price);
            const quantities = product.variants.map((v) => v.quantity);

            return (
              <TableRow key={product.id}>
                {/* Name */}
                <TableCell className="font-medium">{product.name}</TableCell>

                {/* Categories */}
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((c) => (
                      <Badge key={c.id} variant="secondary">
                        {c.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell>
                  {Math.min(...prices).toLocaleString()}đ{" - "}
                  {Math.max(...prices).toLocaleString()}đ
                </TableCell>

                {/* Stock */}
                <TableCell>{quantities.reduce((a, b) => a + b, 0)}</TableCell>

                {/* Rating */}
                <TableCell>
                  ⭐ {product.ratingAvg.toFixed(1)} ({product.ratingCount})
                </TableCell>

                {/* Sold */}
                <TableCell>{product.sold}</TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                      <DropdownMenuItem>Sửa</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
