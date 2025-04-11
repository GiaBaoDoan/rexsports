import { z } from "zod";

export const ProfileFormSchema = z.object({
  image: z.any(),
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự." })
    .optional()
    .default(""),
  address: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const defaultValues: ProfileReqType = {
  image: null,
  name: "",
  address: "",
  description: "",
  phone: "",
};

export type ProfileReqType = z.infer<typeof ProfileFormSchema>;
