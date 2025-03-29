import { z } from "zod";

const validatePhone = /^\d+$/;

export const InforSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(30, { message: "Tên không được quá 30 ký tự" }),
  address: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(200, { message: "Địa chỉ không được quá 200 ký tự" }),
  phone: z
    .string()
    .min(1, { message: "Không để trống thông tin" })
    .max(30, { message: "Tên không được quá 30 ký tự" })
    .refine((text) => text.match(validatePhone), {
      message: "Số điện thoại không hợp lệ",
    }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  payment: z.enum(["COD", "VNPay"], {
    message: "Vui lòng chọn hình thức thanh toán",
  }),
  userNote: z.string().min(1, { message: "Không để trống thông tin" }),
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
