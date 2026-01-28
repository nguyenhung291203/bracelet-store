import { successResponse, errorResponse } from "@/lib/api/response"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    const productId = parseInt(id)
    if (Number.isNaN(productId)) {
      return errorResponse("Invalid product id", 400)
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        ratingCount: true,
        ratingAvg: true,
        sold: true,
        images: true,

        variants: {
          where: {
            isDeleted: false,
            isActive: true,
          },
          orderBy: {
            price: "asc",
          },
          select: {
            id: true,
            price: true,
            quantity: true,
            sku: true,

            size: {
              select: {
                id: true,
                name: true,
                value: true,
              },
            },
            color: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },

        categories: {
          where: {
            isDeleted: false,
          },
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },

        reviews: {
          where: {
            isDeleted: false,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    })

    if (!product) {
      return errorResponse("Product not found", 404)
    }

    const formatted = {
      ...product,
      categories: product.categories.map((pc) => pc.category),
    }

    return successResponse(formatted, "Get product detail successfully")
  } catch (error) {
    console.error(error)
    return errorResponse("Failed to fetch product detail", 500)
  }
}
