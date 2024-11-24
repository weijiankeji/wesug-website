import { z } from 'zod';

export const passwordFormSchema = z.object({
  mobile: z.string().regex(/^1\d{10}$/, {
    message: "Please enter a valid phone number"
  }),
  password: z.string().min(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
});

export const smscodeFormSchema = z.object({
  mobile: z.string().regex(/^1\d{10}$/, {
    message: "Please enter a valid phone number"
  }),
  smscode: z.string().length(6),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
});

export type PasswordFormData = z.infer<typeof passwordFormSchema>;
export type SMSCodeFormData = z.infer<typeof smscodeFormSchema>;