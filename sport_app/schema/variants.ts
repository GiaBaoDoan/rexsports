import { z } from "zod";

export const VariantSchema = z.object({
  _id: z.any(),
  color: z.string().min(1, { message: "Không để trống thông tin" }),
  size: z.string().min(1, { message: "Không để trống thông tin" }),
  icon: z.any().refine((icon) => icon, { message: "Vui lòng thêm ảnh" }),
  stock: z.number({ message: "Dữ liệu không hợp lệ" }),
});

export const VariantDefaultValues: VariantSchemaType = {
  color: "",
  size: "",
  stock: 0,
  icon: null,
};

export type VariantSchemaType = z.infer<typeof VariantSchema>;
