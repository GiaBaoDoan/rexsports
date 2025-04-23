import { ImageSchema } from "@/schema/image";
import { z } from "zod";

export const VariantSchema = z.object({
  _id: z.any(),
  color: z.string().min(1, { message: "Không để trống thông tin" }),
  size: z.string().min(1, { message: "Không để trống thông tin" }),
  icon: ImageSchema,
  stock: z.number({ message: "Dữ liệu không hợp lệ" }),
});

export const VariantDefaultValues: VariantSchemaType = {
  color: "",
  size: "",
  stock: 0,
  icon: "",
};

export type VariantSchemaType = z.infer<typeof VariantSchema>;
