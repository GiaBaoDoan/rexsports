import OrdersTable from "@/components/tables/OrderTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CgArrowTopRight } from "react-icons/cg";

const OrderRecently = () => {
  const router = useRouter();

  return (
    <Card className="mt-10">
      <CardHeader className="text-lg font-medium flex-row flex justify-between items-center">
        <div>
          <CardTitle>Đơn hàng</CardTitle>
          <CardDescription className="mt-2">
            <span>Đơn hàng gần đây</span>
          </CardDescription>
        </div>
        <Button onClick={() => router.push("/dashboard/orders")}>
          Tất cả <CgArrowTopRight />
        </Button>
      </CardHeader>
      <CardContent>
        <OrdersTable />
      </CardContent>
    </Card>
  );
};

export default OrderRecently;
