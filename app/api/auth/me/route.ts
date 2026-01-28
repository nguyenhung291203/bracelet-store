import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireRole } from "@/lib/require-role"
import { successResponse, errorResponse } from "@/lib/api/response"
import { Role } from "@/lib/generated/prisma/enums"

export async function GET(req: NextRequest) {
  const auth = requireRole(req, [
    Role.ADMIN,
    Role.EMPLOYEE,
    Role.CUSTOMER,
  ])

  if (auth instanceof Response) return auth

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    })

    if (!user) {
      return errorResponse("User not found", 404)
    }

    return successResponse(user, "Get profile success")
  } catch (error) {
    console.error("AUTH_ME_ERROR:", error)
    return errorResponse("Internal server error", 500)
  }
}
