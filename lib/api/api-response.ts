export type ApiResponse<T = undefined> = {
  code: number
  message?: string
  data?: T
  errors?: Record<string, string>
  statusCode?: number
}
