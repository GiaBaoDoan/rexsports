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
  FormDescription,
} from "@/components/ui/form";
import { useEffect } from "react";
import { convertToBase64 } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  bannerDefaultValues,
  bannerFormSchema,
  BannerRequestForm,
} from "@/schema/banner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  banner?: BannerRequestForm;
  onSubmit: (data: BannerRequestForm) => void;
  isSubmiting: boolean;
};

export default function BannerForm({ banner, onSubmit, isSubmiting }: Props) {
  const form = useForm<BannerRequestForm>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: banner || bannerDefaultValues,
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
        className="grid grid-cols-3 gap-4 items-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-6 p-4 border rounded-lg shadow col-span-2">
          <FormField
            name="image"
            control={form.control}
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Ảnh banner</FormLabel>
                <FormControl>
                  <Input
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        convertToBase64(event.target.files[0]).then(onChange);
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
                    className="mt-2 object-cover rounded-lg"
                  />
                )}

                <FormMessage />
              </FormItem>
            )}
          />
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
            disabled={isSubmiting}
            name="link"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link tới sản phẩm</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmiting}
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[100px]"
                    {...field}
                    placeholder="Mô tả banner"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="border rounded-lg shadow space-y-4 p-5">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Trạng thái
                </FormLabel>
                <Select
                  value={`${field.value === undefined ? true : field.value}`}
                  onValueChange={(value) => field.onChange(value === "true")}
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
                  Chọn trạng thái hiển thị banners
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
}
