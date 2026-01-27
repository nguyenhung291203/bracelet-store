import { NextResponse } from "next/server"
import { ApiResponse } from "./api-response"

export function successResponse<T>(
  data?: T,
  message = "Success"
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      code: 200,
      message,
      data,
    },
    { status:200 }
  )
}

export function errorResponse(
  message = "Error",
  code = 400,
  errors?: Record<string, string>
) {
  return NextResponse.json<ApiResponse>(
    {
      code,
      message,
      errors,
    },
    { status:200 }
  )
}
