import prisma from "@/lib/prisma"
import { hashPassword } from "@/lib/password"
import { errorResponse, successResponse } from "@/lib/api/response"
import { Role } from "@/types/auth.types"

export async function POST(req: Request) {
  try {
    const { email, fullName, password } = await req.json()

    /* ========= VALIDATE ========= */
    if (!email || !fullName || !password) {
      return errorResponse(
        "Thiếu thông tin bắt buộc",
        400
      )
    }

    if (password.length < 6) {
      return errorResponse(
        "Mật khẩu phải có ít nhất 6 ký tự",
        400,
        { password: "Ít nhất 6 ký tự" }
      )
    }

    /* ========= CHECK EMAIL ========= */
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return errorResponse(
        "Email đã được sử dụng",
        409,
        { email: "Email đã tồn tại" }
      )
    }

    /* ========= CREATE USER ========= */
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        role: Role.CUSTOMER,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    })

    return successResponse(user, "Đăng ký thành công")
  } catch (error) {
    console.error("[REGISTER_ERROR]", error)
    return errorResponse("Đăng ký thất bại", 500)
  }
}
