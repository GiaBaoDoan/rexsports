import { API_URL } from "@/lib/contanst";

export const fetchData = async <T>(
  endpoint: string,
  queryObj?: Record<string, string>,
  options?: RequestInit
): Promise<T | null> => {
  try {
    const params = new URLSearchParams();

    if (queryObj) {
      Object.entries(queryObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });
    }

    const res = await fetch(`${API_URL}/${endpoint}?${params}`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);

    return null;
  }
};
