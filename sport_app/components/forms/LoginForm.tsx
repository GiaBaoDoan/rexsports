"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import useAsyncAction from "@/hooks/useAsyncAction";
import { LoginThunk } from "@/store/thunk/login";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type loginType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const { execute, isLoading } = useAsyncAction();

  const router = useRouter();

  const onSubmit = (data: loginType) => {
    execute({
      actionCreator: () => LoginThunk(data),
      callBack: () => router.push("/dashboard/overview"),
    });
  };

  return (
    <Card className="w-[400px] mx-auto mt-10 p-6 shadow-lg rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">🔐 Tài khoản</CardTitle>
        <p className="text-gray-600 text-xs font-light">
          Chào mừng bạn đến với{" "}
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
            <div>
              <Link
                href="/auth/reset"
                className="text-red-600 hover:underline ml-1 text-xs"
              >
                <span>Quên mật khẩu?</span>
              </Link>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Đăng nhập
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-xs justify-center">
        <Link href="/auth/signup" className="text-red-600 hover:underline ml-1">
          <span>Bạn chưa có tài khoản?</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
