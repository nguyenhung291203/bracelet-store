import { NextRequest } from "next/server"
import { verifyAccessToken } from "@/lib/token"
import { errorResponse } from "@/lib/api/response"
import { Role } from "./generated/prisma/enums"

/**
 * Middleware check role cho API
 * @param req NextRequest
 * @param allowedRoles Role[]
 */
export function requireRole(
  req: NextRequest,
  allowedRoles: Role[]
) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse("Bạn chưa đăng nhập", 401)
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const payload = verifyAccessToken(token)

    if (!allowedRoles.includes(payload.role)) {
      return errorResponse("Forbidden", 403, {
        role: "Bạn không có quyền truy cập",
      })
    }

    return payload
  } catch (error) {
    console.error(error)
    return errorResponse("Unauthorized", 401, {
      auth: "Token không hợp lệ hoặc đã hết hạn",
    })
  }
}
