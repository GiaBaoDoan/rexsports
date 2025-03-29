import { ImageType, ProductRes } from "@/types/product";

export interface CollectionResType {
  _id: string;
  name: string;
  description: string;
  slug: string;
  products: ProductRes[];
  status: boolean;
  priority: number;
  image: ImageType;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionReqType {
  name: string;
  description?: string;
  slug: string;
  products: ProductRes[] | string[];
  status: string;
  priority?: number;
  image?: any;
}
