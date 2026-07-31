import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(2, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
