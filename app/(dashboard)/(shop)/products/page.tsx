import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import CategorySidebar from "@/components/category/category-sidebar";
import PriceRangeFilter from "@/components/price-range-filter";
import { categoryApi } from "@/lib/api/category-api";

export default async function Page() {
      const { data: categories = [] } = await categoryApi.getAll();
    
  return (
    <div className="px-6 py-6 ">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 flex flex-col gap-4">
          <CategorySidebar title="Danh mục" categories={categories.splice(0,10)} activeId={categories[0].id} />
          <PriceRangeFilter />
        </aside>

        <main className="col-span-9 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Danh sách sản phẩm</h1>

            <Select defaultValue="newest">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                <SelectItem value="popular">Phổ biến</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-64 rounded-lg border
                  bg-muted/30
                  animate-pulse
                "
              />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
