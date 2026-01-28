import jwt, { JwtPayload } from "jsonwebtoken"
import { Role } from "./generated/prisma/enums"


const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

const ACCESS_EXPIRES_IN_MS = Number(process.env.JWT_ACCESS_EXPIRES_IN)
const REFRESH_EXPIRES_IN_MS = Number(process.env.JWT_REFRESH_EXPIRES_IN)

if (Number.isNaN(ACCESS_EXPIRES_IN_MS) || Number.isNaN(REFRESH_EXPIRES_IN_MS)) {
  throw new Error("JWT_EXPIRES_IN must be a number (milliseconds)")
}


export interface TokenPayload {
  userId: number
  role: Role
}

export function signAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: Math.floor(ACCESS_EXPIRES_IN_MS / 1000), 
  })
}

export function signRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: Math.floor(REFRESH_EXPIRES_IN_MS / 1000), 
  })
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload
  } catch {
    throw new Error("ACCESS_TOKEN_INVALID")
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload
  } catch {
    throw new Error("REFRESH_TOKEN_INVALID")
  }
}

export function decodeToken(token: string): JwtPayload | null {
  return jwt.decode(token) as JwtPayload | null
}
