import { z } from "zod";

export const CollectionFormSchema = z.object({
  name: z.string().min(3, "Tên bộ sưu tập ít nhất 3 ký tự"),
  description: z.string().optional(),
  image: z.any(),
  slug: z.string({
    message: "Vui lòng thêm slug",
  }),
  products: z.array(z.any()),
  status: z.string().default("true"),
  priority: z
    .number({ message: "Phải nhận vào số" })
    .min(1, "Ưu tiên phải là số lớn hơn 0"),
});

export const defaultValues = {
  name: "",
  description: "",
  image: null,
  status: "true",
  priority: 1,
  products: [],
};
