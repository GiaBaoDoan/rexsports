"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAsyncAction from "@/hooks/useAsyncAction";
import { UpdatePasswordSchema, UpdatePasswordType } from "@/schema/password";
import { UpdatePasswordThunk } from "@/store/thunk/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdatePasswordForm = () => {
  const form = useForm<UpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { execute, isLoading } = useAsyncAction();

  const onSubmit = (data: UpdatePasswordType) => {
    execute({
      actionCreator: () => UpdatePasswordThunk(data),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border p-5 rounded-lg shadow"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                Mật khẩu hiện tại
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                Mật khẩu bạn đã sử dụng để đăng nhập.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                Mật khẩu mới
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                Mật khẩu mới của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          Lưu mật khẩu
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
