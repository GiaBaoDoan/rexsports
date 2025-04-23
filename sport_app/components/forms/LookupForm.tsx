"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/store";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  phone: z.string().min(6, {
    message: "Nhập ít nhất 6 ký tự.",
  }),
});

export function LookupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  function onSubmit(values: { phone: string }) {
    dispatch(fetchOrders(`phone=${values.phone}`));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-5">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl className="flex">
                <div>
                  <Input
                    placeholder="Nhập số điện thoại..."
                    className="py-6 rounded-r-none"
                    {...field}
                  />
                  <Button className="py-6 rounded-l-none" type="submit">
                    Tra cứu
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
