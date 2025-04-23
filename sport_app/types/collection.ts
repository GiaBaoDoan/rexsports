import { ImageType, ProductRes } from "@/types/product";

export interface CollectionResType {
  _id: string;
  name: string;
  description: string;
  slug: string;
  products: ProductRes[] | [];
  status: boolean;
  image: ImageType;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionReqType {
  name: string;
  description?: string;
  slug: string;
  products: ProductRes[] | string[];
  status: boolean;
  image?: any;
}
