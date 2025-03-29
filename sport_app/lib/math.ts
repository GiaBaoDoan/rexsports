import { Cart } from "@/store/slice/cart";

export const calculateCartTotal = (cartItems: Cart[]) => {
  return cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
