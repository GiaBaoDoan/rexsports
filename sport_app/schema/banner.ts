import { ImageSchema } from "@/schema/image";
import { z } from "zod";

export const bannerFormSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  image: ImageSchema,
  link: z.string().url("Đường dẫn không hợp lệ"),
  status: z.boolean().default(true),
  description: z.string().min(1, "Vui lòng thêm nội dung"),
});

export const bannerDefaultValues = {
  title: "",
  image: "",
  link: "",
  status: true,
};

export type BannerRequestForm = z.infer<typeof bannerFormSchema>;
