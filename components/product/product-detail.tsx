"use client"

import { useState } from "react"
import { Product } from "@/types/product.type"
import Image from "next/image"
import clsx from "clsx"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div>
        {/* Main image */}
        <div className="relative aspect-square rounded-xl overflow-hidden border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMainImage(img)}
              className={clsx(
                "relative aspect-square rounded-lg overflow-hidden border transition",
                mainImage === img
                  ? "ring-2 ring-black"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${product.name}-${i}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {product.categories.map((cat) => (
            <span
              key={cat.id}
              className="text-xs px-2 py-1 rounded bg-muted"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">★</span>
          <span>{product.ratingAvg}</span>
          <span className="text-muted-foreground">
            ({product.ratingCount} đánh giá)
          </span>
          <span className="text-muted-foreground">
            · Đã bán {product.sold}
          </span>
        </div>

        {/* ✅ Price changes here */}
        <div className="text-2xl font-bold">
          {selectedVariant.price.toLocaleString()}₫
        </div>

        {/* Variants */}
        <div className="space-y-3">
          {/* Size */}
          <div>
            <p className="text-sm font-medium mb-1">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={clsx(
                    "px-3 py-1 rounded border text-sm transition",
                    selectedVariant.id === v.id
                      ? "border-black bg-black text-white"
                      : "hover:border-black"
                  )}
                >
                  {v.size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-medium mb-1">Màu sắc</p>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={clsx(
                    "w-7 h-7 rounded-full border transition",
                    selectedVariant.id === v.id
                      ? "ring-2 ring-black"
                      : "opacity-70 hover:opacity-100"
                  )}
                  style={{ backgroundColor: v.color.code }}
                  title={v.color.name}
                />
              ))}
            </div>
          </div>

          {/* Stock */}
          <p className="text-sm text-muted-foreground">
            Còn {selectedVariant.quantity} sản phẩm
          </p>
        </div>

        {/* Description */}
        <div className="pt-4 border-t">
          <h2 className="font-medium mb-2">Mô tả sản phẩm</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}
