import { successResponse, errorResponse } from "@/lib/api/response";
import { Role } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = requireRole(req, [Role.ADMIN]);
  if (auth instanceof Response) return auth;

  try {
    const categories = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    return successResponse(categories, "Get users successfully");
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to fetch users", 500);
  }
}
