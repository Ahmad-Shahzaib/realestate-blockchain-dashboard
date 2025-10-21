const API_BASE = process.env.API_BASE_URL || "https://api.fractprop.com/api";

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const base = API_BASE.replace(/\/$/, "");
  const url = `${base}${endpoint}`;

  // Get token (adjust according to your auth storage strategy)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data?.data ?? data;
}

// ✅ Fetch customers
export async function fetchCustomersFromApi(): Promise<any> {
  return apiRequest("/users/customers", { method: "GET" });
}
