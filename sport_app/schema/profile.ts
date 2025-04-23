import { ImageSchema } from "@/schema/image";
import { PhoneSchema } from "@/schema/phoneNumber";
import { z } from "zod";

export const ProfileFormSchema = z.object({
  image: ImageSchema,
  name: z.string().min(1, {
    message: "Không được để trống tên",
  }),
  phone: PhoneSchema,
  address: z.optional(z.string()),
  description: z.optional(z.string()),
});

export const defaultValues: ProfileReqType = {
  image: "",
  name: "",
  address: "",
  description: "",
  phone: "",
};

export type ProfileReqType = z.infer<typeof ProfileFormSchema>;
