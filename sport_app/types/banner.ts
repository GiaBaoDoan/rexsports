import { ImageType } from "@/types/product";

export type BannerRes = {
  _id: string;
  title: string;
  image: ImageType;
  link?: string;
  status: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
};
