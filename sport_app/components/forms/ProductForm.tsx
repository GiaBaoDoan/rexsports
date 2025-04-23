"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  productDefaultValues,
  ProductSchema,
  ProductType,
} from "@/schema/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import ProductVariantForm from "@/components/forms/ProductVariantForm";
import slugify from "slugify";
import { convertMultipleToBase64 } from "@/lib/utils";
import { useEffect } from "react";
import { ImageType } from "@/types/product";
import Editor from "@/components/ui/editor";

interface ProductProps {
  product?: ProductType;
  onSubmit: (data: ProductType) => void;
  isSubmiting: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  isSubmiting,
}: ProductProps) {
  const { categories } = useAppSelector((state) => state.CategoriesReducer);

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product || productDefaultValues,
  });

  const images = form.watch("images");

  const generateSlug = () => {
    form.setValue("slug", slugify(form.getValues("name")));
  };

  const handleRemoveImage = (index: number) => {
    form.setValue(
      "images",
      form.getValues("images").filter((_, i: number) => i !== index)
    );
  };

  useEffect(() => {
    if (product) {
      form.reset(product);
    }
  }, [product, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-5">
          <div className="border p-5 rounded-lg shadow space-y-5 col-span-3">
            <FormField
              control={form.control}
              name="images"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Ảnh previews sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files) {
                          convertMultipleToBase64(event.target.files).then(
                            (newImages) => {
                              const merged = [...(value || []), ...newImages];
                              onChange(merged);
                            }
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Có thể chọn nhiều ảnh để hiển thị trước cho khách hàng.
                  </FormDescription>
                  <FormMessage />
                  <div className="flex flex-wrap gap-2">
                    {images?.map((pre: string | ImageType, index: number) => (
                      <div
                        key={index}
                        className="relative group w-[100px] h-[100px] rounded overflow-hidden border"
                      >
                        <Image
                          src={typeof pre === "string" ? pre : pre.url}
                          alt={`Ảnh ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-8 h-8 bg-red-500  text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isSubmiting}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên sản phẩm" {...field} />
                  </FormControl>
                  <FormDescription>
                    Đây sẽ là tên hiển thị trên website và trong đơn hàng.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                disabled={isSubmiting}
                name="slug"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="slug" />
                    </FormControl>
                    <FormDescription>
                      Slug dùng để tạo đường dẫn (URL) thân thiện với người
                      dùng.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={generateSlug} variant="secondary" type="button">
                Generate
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                disabled={isSubmiting}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        type="number"
                        min={0}
                        placeholder="Giá sản phẩm"
                      />
                    </FormControl>
                    <FormDescription>
                      Giá bán chính thức của sản phẩm (đơn vị: VNĐ).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                disabled={isSubmiting}
                name="fakePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá cũ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        min={0}
                        type="number"
                        placeholder="Giá ưu đãi"
                      />
                    </FormControl>
                    <FormDescription>
                      Giá cũ sẽ được hiển thị gạch ngang nếu nhỏ hơn giá thật.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              disabled={isSubmiting}
              name="description"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Mô tả sản phẩm</FormLabel>
                  <FormControl>
                    <Editor value={value} onChange={onChange} />
                  </FormControl>
                  <FormDescription>
                    Mô tả chi tiết giúp khách hàng hiểu rõ về sản phẩm.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border p-5 rounded-lg shadow space-y-5 self-start">
            <FormField
              control={form.control}
              disabled={isSubmiting}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      disabled={isSubmiting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={"Danh mục"} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat, index) => (
                          <SelectItem key={index} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isSubmiting}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tình trạng</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmiting}
                      value={`${field.value}`}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Công khai</SelectItem>
                        <SelectItem value="false">Hết hàng</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isSubmiting}
              name="sold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đã bán</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      min={0}
                      type="number"
                      placeholder="Số sản phẩm đã bán"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmiting} className="w-full">
              Lưu sản phẩm
            </Button>
          </div>
        </div>
      </form>

      <ProductVariantForm />
    </FormProvider>
  );
}
