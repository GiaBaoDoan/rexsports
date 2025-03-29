import { CheckoutForm } from "@/components/forms/CheckoutForm";

const CheckoutPage = () => {
  return (
    <div className="w-[90%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5 uppercase">Thanh toán đơn hàng</h1>
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
