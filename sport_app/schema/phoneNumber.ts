import { string } from "zod";

export const PhoneSchema = string()
  .min(1, { message: "Không để trống thông tin" })
  .max(11, { message: "Số điện thoại không hợp lệ" })
  .regex(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/, {
    message: "Số điện thoại không hợp lệ",
  });
