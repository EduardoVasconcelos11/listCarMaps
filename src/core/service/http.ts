import { BASE_URL } from "../utils/EndPoints"

export async function http<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = import.meta.env.VITE_TOKEN_AUTH;
  if (!token) {
    throw new Error("TOKEN_AUTH não está definido no ambiente");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...(options?.headers || {})
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `HTTP error! status: ${response.status}, body: ${errorText}`
    )
  }

  return response.json() as Promise<T>
}
