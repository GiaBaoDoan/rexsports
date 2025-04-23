import { CategoriesRes } from "@/types/category";

export interface ImageType {
  url: string;
  publicId: string;
}

export interface VariantType {
  _id: string;
  size: string;
  icon: ImageType;
  color: string;
  stock: number;
}

export interface ProductRes {
  _id: string;
  name: string;
  price: number;
  images: ImageType[];
  description: string;
  fakePrice: number;
  category: CategoriesRes;
  status: boolean;
  slug: string;
  sold: number;
  variants: VariantType[];
  createdAt: string;
  updatedAt: string;
}
