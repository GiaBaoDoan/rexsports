import { ImageType } from "@/types/product";

export type RoleType = "admin" | "user";

export interface UserResType {
  _id: string;
  name: string;
  email: string;
  image?: ImageType;
  status: boolean;
  address: string;
  description: string;
  role: RoleType;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
