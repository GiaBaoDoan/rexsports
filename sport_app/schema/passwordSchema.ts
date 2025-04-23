import { z } from "zod";

export const PasswordSchema = z
  .string()
  .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất một chữ hoa" })
  .regex(/[a-z]/, { message: "Mật khẩu phải chứa ít nhất một chữ thường" })
  .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
  .regex(/[@$!%*?&]/, {
    message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
  });

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
