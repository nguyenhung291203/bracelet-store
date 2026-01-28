import ProductDetail from "@/components/product/product-detail";
import { productApi } from "@/lib/api/product-api";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { code, data: product } = await productApi.getDetail(id);
  console.log("product detail: ", { product });
  if (code !== 200 || !product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
