import { OrderResType } from "@/types/order";

export const styles = {
  Pending: {
    label: "Đơn hàng mới",
    style: "bg-blue-600",
  },
  Confirmed: {
    label: "Đã xác nhận",
    style: "border-orange-200 border bg-orange-50 !text-orange-600",
  },
  Shipped: {
    label: "Đang vận chuyển",
    style: "border-orange-200 border bg-orange-50 !text-orange-600",
  },
  Delivered: {
    label: "Hoàn tất",
    style: "bg-emerald-500",
  },
  Cancelled: {
    label: "Đã hủy bỏ",
    style: "bg-red-600",
  },
};

const OrderShipping = ({ order }: { order: OrderResType }) => {
  const { label, style } = styles[order?.shipping] || "Pending";

  return (
    <span
      className={`${style} hover:opacity-55 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white`}
    >
      {label}
    </span>
  );
};

export default OrderShipping;
