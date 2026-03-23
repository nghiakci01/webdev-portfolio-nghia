import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(5, "Email phải có ít nhất 5 ký tự"),
  subject: z
    .string()
    .min(5, "Chủ đề phải có ít nhất 5 ký tự")
    .max(100, "Chủ đề không được vượt quá 100 ký tự"),
  message: z
    .string()
    .min(10, "Tin nhắn phải có ít nhất 10 ký tự")
    .max(1000, "Tin nhắn không được vượt quá 1000 ký tự"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validation error messages
export const validationMessages = {
  required: "Trường này là bắt buộc",
  invalidEmail: "Email không hợp lệ",
  minLength: (min: number) => `Phải có ít nhất ${min} ký tự`,
  maxLength: (max: number) => `Không được vượt quá ${max} ký tự`,
};
