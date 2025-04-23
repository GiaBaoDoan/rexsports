import { EmailSchema } from "@/schema/email";
import { PhoneSchema } from "@/schema/phoneNumber";
import { z } from "zod";

export const InforSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(30, { message: "Tên không được quá 30 ký tự" }),
  address: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(200, { message: "Địa chỉ không được quá 200 ký tự" }),
  phone: PhoneSchema,
  email: EmailSchema,
  payment: z.enum(["COD", "VNPay"], {
    message: "Vui lòng chọn hình thức thanh toán",
  }),
  userNote: z.optional(z.string()),
  bill: z.any(),
});

export const defaultValues: InforSchemaType = {
  name: "",
  address: "",
  email: "",
  phone: "",
  payment: "COD",
  userNote: "",
};

export type InforSchemaType = z.infer<typeof InforSchema>;
