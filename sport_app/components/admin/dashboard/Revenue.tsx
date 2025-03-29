import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { RevenueRes } from "@/types/dashboard";
import { LucideDollarSign } from "lucide-react";

const TIME_PERIODS = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Tuần này" },
  { key: "month", label: "Tháng này" },
];

const RevenueOverTime = ({ data }: { data: RevenueRes | null }) => {
  return (
    <div className="grid grid-cols-4 gap-3 mt-5">
      {TIME_PERIODS.map((period, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{period.label}</span>
              <LucideDollarSign color="grey" className="w-[14px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(
                data?.[period.key as keyof RevenueRes]?.revenue ?? 0
              )}
            </p>
            <span className="text-gray-600 text-xs">
              Dữ liệu {period.label.toLowerCase()}:{" "}
              {data?.[period.key as keyof RevenueRes]?.orders ?? 0} đơn
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RevenueOverTime;
