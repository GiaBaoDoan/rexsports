"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { convertToBase64 } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  bannerFormSchema,
  BannerRequestForm,
  defaultValues,
} from "@/schema/banner";

type Props = {
  banner?: BannerRequestForm | null;
  onSubmit: (data: BannerRequestForm) => void;
  isSubmiting: boolean;
};

export default function BannerForm({ banner, onSubmit, isSubmiting }: Props) {
  const form = useForm<BannerRequestForm>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues,
  });

  const image = form.watch("image");

  useEffect(() => {
    if (banner) {
      form.reset(banner);
    }
  }, [banner, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded-lg shadow"
      >
        {/* Tiêu đề */}
        <FormField
          disabled={isSubmiting}
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nhập tiêu đề banner" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
          control={form.control}
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Ảnh banner</FormLabel>
              <FormControl>
                <Input
                  onChange={(event) => {
                    if (event.target.files) {
                      convertToBase64(event.target.files[0]).then((image) => {
                        onChange(image);
                      });
                    }
                  }}
                  type="file"
                  accept="image/*"
                />
              </FormControl>
              {image && (
                <Image
                  src={typeof image === "string" ? image : image.url}
                  alt="Ảnh banner"
                  width={150}
                  height={80}
                  className="mt-2 object-cover"
                />
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Đường dẫn */}
        <FormField
          disabled={isSubmiting}
          name="link"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đường dẫn</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nội dung mô tả */}
        <FormField
          disabled={isSubmiting}
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[150px]"
                  {...field}
                  placeholder="Nhập tiêu đề banner"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trạng thái */}
        <FormField
          disabled={isSubmiting}
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Hiển thị</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmiting} type="submit">
          Lưu banner
        </Button>
      </form>
    </Form>
  );
}
