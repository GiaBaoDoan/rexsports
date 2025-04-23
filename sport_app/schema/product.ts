import { ImageSchema } from "@/schema/image";
import { VariantDefaultValues, VariantSchema } from "@/schema/variants";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "không để trống thông tin" }),
  price: z.number({ message: "Dữ liệu không hợp lệ" }),
  fakePrice: z.number(),
  sold: z.number(),
  category: z.string().min(1, { message: "Không để trống thông tin" }),
  images: z
    .array(ImageSchema)
    .min(1, { message: "Vui lòng chọn ít nhất 1 ảnh" }),
  slug: z.string().min(1, "Không để trống thông tin"),
  description: z.string().min(1, { message: "Không để trống thông tin" }),
  status: z.boolean(),
  variants: z.array(VariantSchema),
});

export const productDefaultValues: ProductType = {
  name: "",
  category: "",
  slug: "",
  description: "",
  images: [],
  variants: [VariantDefaultValues],
  status: true,
  price: 0,
  fakePrice: 0,
  sold: 0,
};

export type ProductType = z.infer<typeof ProductSchema>;
