import { ApiResponse } from "./api-response"
import { apiFetch } from "./http"

export type Category = {
  id: string
  name: string
  slug: string
}

export const categoryApi = {
  getAll() {
    return apiFetch<ApiResponse<Category[]>>("/api/categories")
  },

  getById(id: string) {
    return apiFetch<Category>(`/api/categories/${id}`)
  },

  create(data: { name: string }) {
    return apiFetch<Category>("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
