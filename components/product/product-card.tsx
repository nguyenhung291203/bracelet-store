import { Product } from "@/types/product.type"
import Image from "next/image"
import Link from "next/link"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const prices = product.variants.map(v => v.price)
  const quantity = product.variants.reduce((sum, v) => sum + v.quantity, 0)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return (
    <Link
      href={`/products/${product.id}`}
      className="
        group block overflow-hidden rounded-2xl border border-border
        bg-background transition
        hover:shadow-lg
      "
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {product.sold > 0 && (
          <span
            className="
              absolute top-2 left-2
              rounded-full bg-primary px-2 py-1 text-xs
              text-primary-foreground
            "
          >
            Đã bán {product.sold}
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1">
          {product.categories.slice(0, 2).map(cat => (
            <span
              key={cat.id}
              className="
                rounded bg-muted px-2 py-0.5 text-xs
                text-muted-foreground
              "
            >
              {cat.name}
            </span>
          ))}
        </div>

        <h3
          className="
            line-clamp-2 text-sm font-medium
            text-foreground
            group-hover:underline
          "
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-500">★</span>
          <span>{product.ratingAvg}</span>
          <span className="text-muted-foreground">
            ({product.ratingCount})
          </span>
        </div>

        <div className="font-semibold text-foreground">
          {minPrice === maxPrice ? (
            <span>{minPrice.toLocaleString()}₫</span>
          ) : (
            <span>
              {minPrice.toLocaleString()}₫ – {maxPrice.toLocaleString()}₫
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          {product.variants.length} phiên bản ·{" "}
          {quantity} sản phẩm
        </div>
      </div>
    </Link>
  )
}
