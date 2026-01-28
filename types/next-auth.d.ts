import { Role } from "@/lib/generated/prisma/enums"

declare module "next-auth" {
  interface Session {
    accessToken: string
    user: {
      id: number
      role: Role
      email?: string | null
      name?: string | null
    }
  }

  interface User {
    role: Role
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number
    role: Role
    accessToken: string
    refreshToken: string
  }
}
