"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CollectionReqType } from "@/types/collection";
import { convertToBase64 } from "@/lib/utils";
import { useEffect } from "react";
import { CollectionFormSchema, defaultValues } from "@/schema/collection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import slugify from "slugify";
import { FormProvider, useForm } from "react-hook-form";
import ComboboxForm from "@/components/forms/ComboboxForm";

type props = {
  collection?: CollectionReqType;
  onSubmit: (data: CollectionReqType) => void;
  isSubmiting: boolean;
};

export default function CollectionForm({
  onSubmit,
  collection,
  isSubmiting,
}: props) {
  const form = useForm<CollectionReqType>({
    resolver: zodResolver(CollectionFormSchema),
    defaultValues,
  });

  const image = form.watch("image");

  const generateSlug = () => {
    form.setValue("slug", slugify(form.getValues("name")));
  };

  useEffect(() => {
    if (collection) {
      form.reset(collection);
    }
  }, [collection, form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-5 items-start"
      >
        <div className="border rounded-lg shadow p-4 col-span-2 space-y-4">
          {/* image */}
          <FormField
            name="image"
            control={form.control}
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Ảnh Đại diện</FormLabel>
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
                    src={typeof image === "string" ? image : image?.url}
                    alt="Ảnh bộ sưu tập"
                    width={150}
                    height={80}
                    className="mt-2 object-cover"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* name */}
          <FormField
            name="name"
            disabled={isSubmiting}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tên bộ sưu tập" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* slug */}
          <FormField
            disabled={isSubmiting}
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} placeholder="Slug" />
                  </FormControl>
                  <Button type="button" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* products in collections */}
          <ComboboxForm />
          {/* description */}
          <FormField
            disabled={isSubmiting}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[150px]"
                    {...field}
                    placeholder="Nhập mô tả..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* status && piority  */}
        <div className="border rounded-lg shadow p-4 space-y-4 ">
          <FormField
            name="status"
            disabled={isSubmiting}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-col flex gap-3">
                <FormLabel>Hiển thị</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled={isSubmiting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tình trạng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Hoạt động</SelectItem>
                      <SelectItem value="false">Dừng hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="priority"
            disabled={isSubmiting}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ưu tiên</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    min={1}
                    type="number"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    placeholder="Nhập số ưu tiên"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Lưu collection
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
