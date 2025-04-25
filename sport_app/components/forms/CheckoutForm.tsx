"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { defaultValues, InforSchema, InforSchemaType } from "@/schema/infor";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { formatCurrency } from "@/lib/format";
import { createOrder } from "@/store/thunk/create-order";
import { useEffect } from "react";
import { calculateCartTotal } from "@/lib/math";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Payment from "@/components/pages/payment/Payment";
import { convertToBase64 } from "@/lib/utils";
import { OrderResType } from "@/types/order";

export function CheckoutForm() {
  const { cart } = useAppSelector((state) => state.CartReducer);

  const { execute, isLoading } = useAsyncAction<OrderResType>();

  const router = useRouter();

  const form = useForm<InforSchemaType>({
    resolver: zodResolver(InforSchema),
    defaultValues,
  });

  const payment = form.watch("payment");
  const bill = form.watch("bill");

  const onSubmit = (infor: InforSchemaType) => {
    const order = { ...infor, cart };

    if (infor.payment === "VNPay" && !bill) {
      return form.setError("bill", { message: "Bạn cần tải biên lai lên !!" });
    }

    execute({
      actionCreator: () => createOrder(order),
      callBack: (res) => {
        router.push(`/checkout-success/${res.data._id}`);
        localStorage.removeItem("carts");
        localStorage.setItem("user", JSON.stringify({ ...infor, bill: "" }));
      },
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      form.reset(JSON.parse(user || ""));
    }
  }, [form]);

  return (
    <div className="space-y-5">
      {payment === "VNPay" && <Payment />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-3"
        >
          {/* Thông tin người nhận */}
          <div className="border rounded-lg p-7 self-start col-span-2">
            <h2 className="text-lg font-medium uppercase mb-5">
              Thông tin người nhận
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["name", "email", "phone", "address"].map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof InforSchemaType}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={field.name.toUpperCase()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* Phương thức thanh toán */}
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Loại thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="COD">
                              💵 Ship COD (TIỀN MẶT)
                            </SelectItem>
                            <SelectItem value="VNPay">
                              🏦 VNPay (CHUYỂN KHOẢN)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Ghi chú đơn hàng */}
              <FormField
                control={form.control}
                name="userNote"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Textarea
                        className="min-h-[100px]"
                        placeholder="GHI CHÚ ĐƠN HÀNG"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Biên lai đính kèm */}
              {payment === "VNPay" && (
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="bill"
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel>Đính kèm biên lai</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="Biên lai đính kèm"
                            accept="image"
                            onChange={(event) => {
                              if (event.target.files) {
                                convertToBase64(event.target.files[0]).then(
                                  onChange
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Vui lòng tải biên lai sau khi chuyển khoản !!
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {bill && (
                    <Image
                      src={bill}
                      alt="Ảnh sản phẩm"
                      width={200}
                      height={200}
                      className="object-cover w-[200px] h-[200px] rounded border mt-2"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="border rounded-lg p-5 space-y-4">
              <h2 className="text-lg font-medium uppercase border-b pb-3">
                Đơn hàng
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex items-center gap-4 border-b pb-3 last:border-none"
                  >
                    <Image
                      alt="icon"
                      width={50}
                      height={50}
                      src={`${item.icon}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
              {cart.length === 0 && (
                <div className="flex-1 text-center">
                  Giỏ hàng đang trống. Vui lòng quay lại trang chủ để tiếp tục
                  mua hàng.
                </div>
              )}
              <div className="flex justify-between font-medium text-lg pt-4 border-t">
                <p>TỔNG</p>
                <p>{formatCurrency(calculateCartTotal(cart))}</p>
              </div>
            </div>
            <Button
              disabled={isLoading || cart.length === 0}
              className="w-full mt-5 uppercase"
            >
              Đặt hàng
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
