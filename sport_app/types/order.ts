import { Cart } from "@/store/slice/cart";

export enum PaymentType {
  COD = "COD",
  VNPay = "VNPay",
}

export type ShippingType =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderResType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bill?: string;
  isPaid: boolean;
  userNote?: string;
  cart: Cart[] | [];
  payment: PaymentType;
  adminNote?: string;
  shipping: ShippingType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderReqType {
  name: string;
  email: string;
  phone: string;
  address: string;
  bill?: string;
  isPaid: string;
  payment: PaymentType;
  cart: Cart[] | [];
  userNote?: string;
  adminNote?: string;
  shipping: ShippingType;
}
