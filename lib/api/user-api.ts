import { ApiResponse } from "./api-response"
import { apiFetch } from "./http"
import { User } from "@/types/user.type"



export const userApi = {
  getAll() {
    return apiFetch<ApiResponse<User[]>>("/api/users")
  },

}
