"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Avatar from "@/components/ui/avatar";
import { ImageType } from "@/types/product";
import { ImageSchema } from "@/schema/image";

const formSchema = z.object({
  email: z.string().email(),
  image: ImageSchema,
  name: z.string().min(1, { message: "không để trống thông tin" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  status: z.boolean(),
  role: z.enum(["admin", "user"]),
});

const defaultValues: UserReqType = {
  email: "",
  image: "",
  phone: "",
  name: "",
  address: "",
  description: "",
  status: true,
  role: "user",
};

export type UserReqType = z.infer<typeof formSchema>;

type props = {
  user: UserReqType;
  onSubmit: (user: UserReqType) => void;
  isSubmiting: boolean;
};

const UserForm = ({ user, isSubmiting, onSubmit }: props) => {
  const form = useForm<UserReqType>({
    resolver: zodResolver(formSchema),
    defaultValues: user || defaultValues,
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [form, user]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 items-start"
      >
        <div className="col-span-2 border shadow rounded-lg p-5 space-y-8">
          <div className="space-y-2 text-sm">
            <Label className="font-semibold text-gray-700">Email</Label>
            <p>{user.email}</p>
            {<Avatar avatar={user.image as ImageType} />}
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Họ và tên
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ và tên" {...field} />
                </FormControl>
                <FormDescription>Tên đầy đủ của bạn</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Số điện thoại
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Dùng để liên hệ khi cần</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Địa chỉ
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ của bạn" {...field} />
                </FormControl>
                <FormDescription>
                  Ví dụ: Số 123, Đường ABC, TP.HCM
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Mô tả
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-28"
                    placeholder="Mô tả ngắn về bản thân"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Chia sẻ một chút về bạn</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border rounded-lg shadow space-y-4 p-5">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Quyền
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quyền" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">Người dùng</SelectItem>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>Phân quyền người dùng</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Trạng thái
                </FormLabel>
                <Select
                  value={`${field.value}`}
                  onValueChange={(val) => field.onChange(val === "true")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Công khai</SelectItem>
                      <SelectItem value="false">Ẩn danh</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Chọn trạng thái hiển thị hồ sơ
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmiting} type="submit" className="w-full">
            Lưu thông tin
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
