"use client";

import { Product } from "@/types/product.type";
import ProductRow from "@/components/product/product-row";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type ProductTabsProps = {
  products: Product[];
};

export default function ProductTabs({ products }: ProductTabsProps) {
  const newProducts = products.slice(0, 5);

  const hotProducts = products
    .slice()
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const featuredProducts = products
    .slice()
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 5);

  const saleProducts = products.slice(5, 10);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="overview">Sản phẩm mới</TabsTrigger>
        <TabsTrigger value="analytics">Sản phẩm hot</TabsTrigger>
        <TabsTrigger value="reports">Sản phẩm nổi bật</TabsTrigger>
        <TabsTrigger value="settings">Sản phẩm khuyến mại</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-3">
        {newProducts.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TabsContent>

      <TabsContent value="analytics" className="space-y-3">
        {hotProducts.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TabsContent>

      <TabsContent value="reports" className="space-y-3">
        {featuredProducts.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TabsContent>

      <TabsContent value="settings" className="space-y-3">
        {saleProducts.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
