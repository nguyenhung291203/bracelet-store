import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const API_URL = process.env["NEXT_PUBLIC_API_URL"] || ""

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>
  useAuth?: boolean
}

async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions)
    return session?.accessToken || null
  } else {
    const session = await getSession()
    return session?.accessToken || null
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers, useAuth = true, ...rest } = options

  let url = API_URL + endpoint

  if (params) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    )
    url += `?${query.toString()}`
  }

  let authHeaders = {}
  if (useAuth) {
    const token = await getAccessToken()
    if (token) {
      authHeaders = {
        Authorization: `Bearer ${token}`,
      }
    }
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
    ...rest,
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.message || "Fetch error")
  }

  return json
}