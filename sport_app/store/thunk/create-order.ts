import { OrderServices } from "@/services/client-side/orders";
import { Cart } from "@/store/slice/cart";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface OrderType {
  name: string;
  email: string;
  phone: string;
  address: string;
  cart: Cart[];
}

export const createOrder = createAsyncThunk(
  "/create-order",
  async (data: OrderType, { rejectWithValue }) => {
    try {
      const res = await OrderServices.createOrder(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
