import { Category } from "@/types/category.type"
import { ApiResponse } from "./api-response"
import { apiFetch } from "./http"



export const categoryApi = {
  getAll() {
    return apiFetch<ApiResponse<Category[]>>("/api/categories")
  },

  getById(id: string) {
    return apiFetch<Category>(`/api/categories/${id}`)
  },

  create(data: { name: string }) {
    return apiFetch<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
