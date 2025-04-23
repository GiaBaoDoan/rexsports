import { ImageSchema } from "@/schema/image";
import { z } from "zod";

export const CollectionFormSchema = z.object({
  name: z.string().min(1, "không được để trống thông tin"),
  slug: z.string({
    message: "Vui lòng thêm slug",
  }),
  description: z.string().optional(),
  image: ImageSchema,
  products: z.array(z.any()),
  status: z.boolean(),
});

export const collectionDefaultValues = {
  name: "",
  description: "",
  image: "",
  status: true,
  products: [],
};
