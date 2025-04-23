import { PasswordSchema } from "@/schema/passwordSchema";
import { z } from "zod";

export const UpdatePasswordSchema = z.object({
  currentPassword: PasswordSchema,
  newPassword: PasswordSchema,
});

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
