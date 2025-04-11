import { VariantDefaultValues, VariantSchema } from "@/schema/variants";
import { z } from "zod";

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// .refine(
//   (files) =>
//     Array.from(files).every((file: any) =>
//       ACCEPTED_IMAGE_TYPES.includes(file.type)
//     ),
//   "Only these types are allowed .jpg, .jpeg, .png and .webp"
// ),

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "không để trống thông tin" }),
  price: z.number({ message: "Dữ liệu không hợp lệ" }),
  fakePrice: z.any(),
  category: z.string().min(1, { message: "Không để trống thông tin" }),
  images: z.any().refine((images) => images !== null || images.length !== 0, {
    message: "không để trống thông tin",
  }),
  slug: z.string().min(1, "Không để trống thông tin"),
  status: z.string(),
  description: z.string().min(1, { message: "Không để trống thông tin" }),
  variants: z.array(VariantSchema),
});

export const defaultValues: ProductType = {
  name: "",
  category: "",
  price: 0,
  images: [],
  status: "true",
  slug: "",
  description: "",
  variants: [VariantDefaultValues],
};

export type ProductType = z.infer<typeof ProductSchema>;
