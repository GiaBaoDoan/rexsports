"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";
import { resetNewPassword } from "@/store/thunk/reset-newPassword";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất một chữ hoa" })
    .regex(/[a-z]/, { message: "Mật khẩu phải chứa ít nhất một chữ thường" })
    .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
    .regex(/[@$!%*?&]/, {
      message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
    }),
});

export type FormType = z.infer<typeof FormSchema>;

const ResetNewPasswordForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const { execute } = useAsyncAction();

  const { id, token } = useParams();

  const onSubmit = (data: FormType) => {
    execute({
      actionCreator: () =>
        resetNewPassword({
          userId: id as string,
          token: token as string,
          password: data.password,
        }),
    });
  };

  return (
    <Card className="w-[400px] mx-auto mt-10 p-3 shadow-lg rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">🔐 Tài khoản</CardTitle>
        <p className="text-gray-600 text-xs font-light">
          Vui lòng nhập mật khẩu mới
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Đặt lại mật khẩu mới
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetNewPasswordForm;
