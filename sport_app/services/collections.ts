import { ApiResponse } from "@/types/types";
import AxiosIntance from "@/lib/configAxios";
import { CollectionReqType, CollectionResType } from "@/types/collection";

export const CollectionSeverices = {
  getAllCollections: () =>
    AxiosIntance.get<ApiResponse<CollectionResType[]>>(`/collections`),
  getCollectionById: (idOrSlug: string) =>
    AxiosIntance.get<ApiResponse<CollectionResType>>(`collections/${idOrSlug}`),
  createCollection: (data: CollectionReqType) =>
    AxiosIntance.post<ApiResponse<CollectionResType>>(`collections`, data),
  updateCollection: (idOrSlug: string, data: CollectionReqType) =>
    AxiosIntance.put<ApiResponse<CollectionResType>>(
      `collections/${idOrSlug}`,
      data
    ),
  deleteCollection: (id: string) =>
    AxiosIntance.delete<ApiResponse<CollectionResType>>(`collections/${id}`),
};
