import * as z from "zod";

/**
 * The form schema for the code route.
 * Forces type safety on the form.
 */
export const GenerateFormSchema: z.ZodType<GenerateFormData> = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  duration: z.string().regex(/^\d+$/,"Duration should be a number")
});

export type GenerateFormData = {
  prompt: string;
  duration:string
};


export const SignUpFormSchema: z.ZodType<SignUpData> = z.object({
  first_name: z.string()
  .min(2, 'First name must be at least 2 characters long')
  .max(30, 'First name must be at most 30 characters long')
  .regex(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters'),
  last_name: z.string()
  .min(2, 'Last name must be at least 2 characters long')
  .max(30, 'Last name must be at most 30 characters long')
  .regex(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters'),
  email: z.string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email.")
    .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  password: z.string().min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character')
});

export type SignUpData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}