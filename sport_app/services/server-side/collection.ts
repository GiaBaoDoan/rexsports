import { API_URL } from "@/lib/contanst";
import { CollectionResType } from "@/types/collection";
import { ApiResponse } from "@/types/types";

export const getAllCollectionsServer = async () => {
  const res = await fetch(`${API_URL}/collections`, {
    cache: "no-store",
  });

  const data = (await res.json()) as ApiResponse<CollectionResType[]>;

  return data.data;
};
