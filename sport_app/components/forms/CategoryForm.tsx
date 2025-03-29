"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValues,
  CategorySchema,
  CategorySchemaType,
} from "@/schema/category";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import slugify from "slugify";

interface Props {
  category?: CategorySchemaType;
  onSubmit: (data: CategorySchemaType) => void;
  isSubmiting: boolean;
}

const CategoryForm = ({ category, onSubmit, isSubmiting }: Props) => {
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  });

  const generateSlug = () => {
    form.setValue("slug", slugify(form.getValues("name")));
  };

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  return (
    <div className="border p-5 rounded-lg w-[700px] shadow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            disabled={isSubmiting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên danh mục</FormLabel>
                <FormControl>
                  <Input placeholder={"Tên danh mục"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmiting}
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl className="flex">
                  <div className="space-x-2">
                    <Input {...field} />
                    <Button
                      variant="secondary"
                      onClick={generateSlug}
                      type="button"
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.handleSubmit(onSubmit)}
            type="submit"
            className="px-3"
          >
            Lưu danh mục
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
