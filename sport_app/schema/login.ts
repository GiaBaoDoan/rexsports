import { EmailSchema } from "@/schema/email";
import { PasswordSchema } from "@/schema/passwordSchema";
import { z } from "zod";

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
