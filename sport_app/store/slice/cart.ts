"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Cart = {
  productId: string; // ID của sản phẩm
  variantId: string;
  size: string;
  color: string;
  quantity: number;
  name: string;
  price: number;
  icon: string;
};

type initialState = {
  cart: Cart[];
};

const initialState: initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<Cart[]>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<Cart>) => {
      const { payload } = action;
      const existingItem = state.cart.find(
        (i) => i.variantId === payload.variantId
      );
      if (!existingItem) {
        state.cart.push({ ...payload, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }

      localStorage.setItem("carts", JSON.stringify(state.cart));
    },

    increaseCart: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      const existingItem = state.cart.find((i) => i.variantId === id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      localStorage.setItem("carts", JSON.stringify(state.cart));
    },

    decreaseCart: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      const existingItem = state.cart.find((i) => i.variantId === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }

      localStorage.setItem("carts", JSON.stringify(state.cart));
    },

    removeCart: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      state.cart = state.cart.filter((i) => i.variantId !== id);
      localStorage.setItem("carts", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, setCarts, increaseCart, decreaseCart, removeCart } =
  CartSlice.actions;
export default CartSlice.reducer;
