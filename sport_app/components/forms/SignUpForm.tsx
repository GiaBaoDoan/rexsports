"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useAsyncAction from "@/hooks/useAsyncAction";
import { SignupThunk } from "@/store/thunk/signup";
import { SignupSchema, SignupSchemaType } from "@/schema/signup";

export function SignupForm() {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { execute, isLoading } = useAsyncAction();

  const onSubmit = (data: SignupSchemaType) => {
    const { email, name, password } = data;
    execute({
      actionCreator: () => SignupThunk({ email, name, password }),
    });
  };

  return (
    <Card className="w-[400px] mx-auto mt-10 p-4 shadow-lg rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-medium">🔐 Tạo tài khoản</CardTitle>
        <p className="text-gray-600 text-xs font-light">
          Chào mừng bạn đến với
          <span className="text-red-600 font-bold italic">Rexsports</span>
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Họ tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-xs justify-center">
        <Link href="/auth/login" className="text-red-600 hover:underline ml-1">
          <span>Quay lại trang đăng nhập</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
