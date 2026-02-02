import { successResponse, errorResponse } from "@/lib/api/response";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return successResponse(categories, "Get categories successfully");
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch categories", 500);
  }
}
