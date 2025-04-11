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
import useAsyncAction from "@/hooks/useAsyncAction";
import { requestResetPasswordThunk } from "@/store/thunk/request-resetPassword";

const FormSchema = z.object({
  email: z.string().min(1, "Yêu cầu email").email("Email không hợp lệ"),
});

export type FormType = z.infer<typeof FormSchema>;

const ResetWithEmailForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const { execute } = useAsyncAction();

  const onSubmit = (data: FormType) => {
    execute({
      actionCreator: () => {
        return requestResetPasswordThunk(data.email);
      },
    });
  };

  return (
    <Card className="w-[400px] mx-auto mt-10 p-3 shadow-lg rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">🔐 Tài khoản</CardTitle>
        <p className="text-gray-600 text-xs font-light">Quên mật khẩu?</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Reset mật khẩu với email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetWithEmailForm;
