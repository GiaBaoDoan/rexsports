import CartList from "@/components/pages/cart/CartList";
import { FormCheckout } from "@/components/pages/cart/CartCheckout";

const Cart = () => {
  return (
    <div className="w-[90%] mx-auto container py-10">
      <article className="mb-5">
        <h1 className="text-6xl font-bold">Giỏ hàng</h1>
      </article>
      <CartList />
      <FormCheckout />
    </div>
  );
};

export default Cart;
