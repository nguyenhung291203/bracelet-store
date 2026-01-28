"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product.type";
import Image from "next/image";
import clsx from "clsx";
import { SizeGuideDialog } from "./size-guide-dialog";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const colors = useMemo(
    () =>
      Array.from(
        new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
      ),
    [product.variants],
  );

  const sizes = useMemo(
    () =>
      product.variants
        .filter((v) => v.color.id === selectedVariant.color.id)
        .map((v) => v.size),
    [product.variants, selectedVariant.color.id],
  );

  const handleSelectColor = (colorId: number) => {
    const nextVariant = product.variants.find((v) => v.color.id === colorId);
    if (nextVariant) setSelectedVariant(nextVariant);
  };

  const handleSelectSize = (sizeId: number) => {
    const nextVariant = product.variants.find(
      (v) => v.color.id === selectedVariant.color.id && v.size.id === sizeId,
    );
    if (nextVariant) setSelectedVariant(nextVariant);
  };

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div>
        <div className="relative aspect-square rounded-xl overflow-hidden border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(img)}
              className={clsx(
                "relative aspect-square rounded-lg overflow-hidden border",
                mainImage === img
                  ? "ring-2 ring-black"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <div className="text-2xl font-bold">
          {selectedVariant.price.toLocaleString()}₫
        </div>

        {/* SIZE */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium mb-1">Size</p>
            <SizeGuideDialog />
          </div>

          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => handleSelectSize(size.id)}
                className={clsx(
                  "px-3 py-1 rounded border text-sm",
                  selectedVariant.size.id === size.id
                    ? "bg-black text-white border-black"
                    : "hover:border-black",
                )}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}
        <div>
          <p className="text-sm font-medium mb-1">Màu sắc</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleSelectColor(color.id)}
                className={clsx(
                  "w-7 h-7 rounded-full border",
                  selectedVariant.color.id === color.id
                    ? "ring-2 ring-black"
                    : "opacity-70 hover:opacity-100",
                )}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Còn {selectedVariant.quantity} sản phẩm
        </p>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
