import { PasswordSchema } from "@/schema/passwordSchema";
import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),
    name: z.string().min(1, { message: "Không để trống thông tin" }),
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
