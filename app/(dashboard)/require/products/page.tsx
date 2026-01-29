import { Button } from "@/components/ui/button";
import { productApi } from "@/lib/api/product-api";

import ListProduct from "./list-product";
import ProductFilters from "./product-filters";

export default async function Page() {
  const { data: products = [] } = await productApi.getAll();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <Button>+ Thêm sản phẩm</Button>
      </div>

      <ProductFilters />

      {/* Table */}
      <ListProduct products={products.splice(0, 10)} />
    </div>
  );
}
