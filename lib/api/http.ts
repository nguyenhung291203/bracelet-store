const API_URL = process.env["NEXT_PUBLIC_API_URL"] || ""

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers, ...rest } = options

  let url = API_URL + endpoint

  if (params) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    )
    url += `?${query.toString()}`
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
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
