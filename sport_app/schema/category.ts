import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(50, { message: "Tên danh mục không quá 30 ký tự" }),
  slug: z.string().min(1, "Không để trống thông tin"),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;

export const defaultValues: CategorySchemaType = {
  name: "",
  slug: "",
};
