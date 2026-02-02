import { successResponse, errorResponse } from "@/lib/api/response";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isDeleted: false },
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        ratingCount: true,
        ratingAvg: true,
        sold: true,
        images: true,
        createdAt:true,
        variants: {
          where: {
            isDeleted: false,
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
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      categories: p.categories.map((pc) => pc.category),
    }));

    return successResponse(formatted, "Get products successfully");
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch products", 500);
  }
}
