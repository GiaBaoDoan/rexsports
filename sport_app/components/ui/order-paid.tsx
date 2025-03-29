import { OrderResType } from "@/types/order";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrderPaid = ({ order }: { order: OrderResType }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {order?.isPaid ? (
          <FaCheckCircle className="text-green-500" size={16} />
        ) : (
          <FaTimesCircle className="text-red-500" size={16} />
        )}
        <p
          className={`text-sm  ${
            order?.isPaid ? "text-green-600" : "text-red-600"
          }`}
        >
          {order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </p>
      </div>
      <p className="text-slate-500 text-xs">
        {order?.payment || "Không có thông tin thanh toán"}
      </p>
    </div>
  );
};

export default OrderPaid;
