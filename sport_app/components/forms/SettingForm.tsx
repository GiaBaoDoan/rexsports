"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import Image from "next/image";
import useAsyncAction from "@/hooks/useAsyncAction";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertToBase64 } from "@/lib/utils";
import { useEffect } from "react";
import { useAppSelector } from "@/store/store";
import {
  defaultValues,
  ProfileFormSchema,
  ProfileReqType,
} from "@/schema/profile";
import { UpdateProfileThunk } from "@/store/thunk/update-profile";

export function SettingForm() {
  const form = useForm<ProfileReqType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: defaultValues,
  });

  const { profile } = useAppSelector((state) => state.ProfileReducer);

  const { execute, isLoading } = useAsyncAction();

  const onSubmit = (data: ProfileReqType) => {
    execute({
      actionCreator: () => UpdateProfileThunk(data),
    });
  };

  const image = form.watch("image");

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [form, profile]);

  return (
    <Form {...form}>
      <form className="col-span-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 col-span-2 border p-5 rounded-lg shadow">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Hình ảnh đại diện
                </FormLabel>
                {image && (
                  <Image
                    src={typeof image === "string" ? image : image.url}
                    alt="Ảnh banner"
                    width={150}
                    height={80}
                    className="mt-2 w-24 h-24 rounded-full object-cover"
                  />
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files) {
                        convertToBase64(event.target.files[0]).then(onChange);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Thêm Avatar
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Trường Tên */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Tên
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên của bạn" {...field} />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Đây là tên công khai của bạn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Trường Số điện thoại */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Số điện thoại
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Đây là số điện thoại liên lạc của bạn.
                </FormDescription>
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
                  <Input placeholder="Địa chỉ nếu có" {...field} />
                </FormControl>
                <FormDescription className="text-sm text-gray-500">
                  Địa chỉ của bạn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trường Mô tả */}
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
                    placeholder="Mô tả về bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-sm text-gray-500">
                  Mô tả đôi nét về bản thân
                </FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>Lưu profile</Button>
        </div>
      </form>
    </Form>
  );
}
