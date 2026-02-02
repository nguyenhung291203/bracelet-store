import { categoryApi } from "@/lib/api/category-api";
import { productApi } from "@/lib/api/product-api";
import Client from "./client";

export default async function Page() {
  const { data: categories = [] } = await categoryApi.getAll();
  const { data: products = [] } = await productApi.getAll();
  return <Client categories={categories} products={products} />;
}
