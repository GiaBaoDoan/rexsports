import { z } from "zod";

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Mật khẩu hiện tại phải có ít nhất 6 ký tự.",
  }),
  newPassword: z.string().min(6, {
    message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
  }),
});

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
