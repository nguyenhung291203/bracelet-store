import { categoryApi } from "@/lib/api/category-api";
import { productApi } from "@/lib/api/product-api";
import ProductTabs from "./product-tabs";
import ProductGrid from "./product-grid";

export default async function Page() {
  const { data: categories = [] } = await categoryApi.getAll();
  const { data: products = [] } = await productApi.getAll();
  return (
    <div className="space-y-8">
      <ProductGrid categories={categories} products={products}/>
      <ProductTabs products={products} />
    </div>
  );
}
