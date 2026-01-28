import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { signAccessToken, signRefreshToken } from "@/lib/token"
import { successResponse, errorResponse } from "@/lib/api/response"
import { TokenType } from "@/lib/generated/prisma/enums"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const errors: Record<string, string> = {}

    if (!email) errors.email = "Email là bắt buộc"
    if (!password) errors.password = "Mật khẩu là bắt buộc"

    if (Object.keys(errors).length > 0) {
      return errorResponse("Validation error", 400, errors)
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return errorResponse("Invalid credentials", 409, {
        email: "Tài khoản hoặc mật khẩu không chính xác",
        password: "Tài khoản hoặc mật khẩu không chính xác",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return errorResponse("Invalid credentials", 409, {
        email: "Tài khoản hoặc mật khẩu không chính xác",
        password: "Tài khoản hoặc mật khẩu không chính xác",
      })
    }

    const payload = {
      userId: user.id,
      role: user.role,
    }

    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)

    await prisma.token.create({
      data: {
        userId: user.id,
        token: refreshToken,
        type: TokenType.REFRESH,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000 
        ),
      },
    })

    return successResponse(
      {
        accessToken,
        refreshToken,
      },
      "Login successful"
    )
  } catch (error) {
    console.error("LOGIN_ERROR:", error)
    return errorResponse("Internal server error", 500)
  }
}
