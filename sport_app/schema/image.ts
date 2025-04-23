import { z } from "zod";

export const ImageSchema = z
  .union([
    z.string().min(1, "Vui lòng thêm ảnh"),
    z.object({
      url: z.string().min(1),
      publicId: z.string().min(1),
    }),
  ])
  .refine(
    (val) => {
      if (typeof val === "string") return val.length > 0;
      if (typeof val === "object") return val.url && val.publicId;
      return false;
    },
    {
      message: "Vui lòng chọn ảnh",
    }
  );
