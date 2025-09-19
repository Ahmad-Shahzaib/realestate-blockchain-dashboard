const API_BASE = process.env.API_BASE_URL || 'https://api.fractprop.com/api';

export async function fetchCustomersFromApi(): Promise<any> {
  const base = API_BASE.replace(/\/$/, '');
  const url = `${base}/users/customers`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch customers: ${res.status} ${text}`);
  }

  const data = await res.json();
  // prefer data.data if backend wraps payload
  return data?.data ?? data;
}
