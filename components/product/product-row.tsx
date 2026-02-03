"use client";

import Image from "next/image"
import { Product } from "@/types/product.type"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation";

type ProductRowProps = {
  product: Product
}

export default function ProductRow({ product }: ProductRowProps) {
      const router = useRouter();

  const minPrice = Math.min(...product.variants.map(v => v.price))

  return (
    <Card
      onClick={() => router.push(`/shop/products/${product.id}`)}
      className="w-full cursor-pointer hover:bg-muted/50 transition"
    >
      <CardContent className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative w-20 h-20 shrink-0">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold leading-tight line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-destructive">
              ₫{minPrice.toLocaleString()}
            </span>

            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-500" />
              {product.ratingAvg.toFixed(1)}
              <span className="text-muted-foreground">
                ({product.ratingCount})
              </span>
            </span>

            <span className="text-muted-foreground">
              Đã bán {product.sold}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {product.categories.map(cat => (
              <Badge key={cat.id} variant="secondary">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
