import { string } from "zod";

export const EmailSchema = string().email("Email không hợp lệ");
