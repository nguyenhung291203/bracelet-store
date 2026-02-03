"use client";
import CategorySidebar from "@/components/category/category-sidebar";
import ProductCard from "@/components/product/product-card";
import { Category } from "@/types/category.type";
import { Product } from "@/types/product.type";
import { useMemo, useState } from "react";

interface ProductGridProps {
  categories: Category[];
  products: Product[];
}

export default function ProductGrid({
  categories,
  products,
}: ProductGridProps) {
  const [category, setCategory] = useState<Category | null>(
    categories[0] ?? null,
  );
  const selectedProducts = useMemo(() => {
    if (!category) return products.slice(0, 6);

    return products
      .filter((product) => product.categories.some((c) => c.id === category.id))
      .slice(0, 6);
  }, [products, category]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3">
        <CategorySidebar
          title={category?.name || "Danh mục sản phẩm"}
          categories={categories.slice(0, 10)}
          activeId={category?.id}
          onChange={(id) => {
            const res = categories.find((item) => item.id === id);
            if (!res) {
              return;
            }
            setCategory(res);
          }}
        />
      </aside>

      <main className="col-span-12 md:col-span-9">
        <div
          className="
      grid
      grid-cols-3
      sm:grid-cols-4
      md:grid-cols-5
      lg:grid-cols-6
      gap-4
    "
        >
          {selectedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
