import { inter } from "@/app/fonts";
import { DefaultUser } from "next-auth";
import * as z from "zod";

/**
 * The form schema for the code route.
 * Forces type safety on the form.
 */
export const GenerateFormSchema: z.ZodType<GenerateFormData> = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  duration: z.string().regex(/^\d+$/, "Duration should be a number")
});

export type GenerateFormData = {
  prompt: string;
  duration: string
};





export const SignUpFormSchema: z.ZodType<SignUpData> = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters long')
    .max(30, 'First name must be at most 30 characters long')
    .regex(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(30, 'Last name must be at most 30 characters long')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters'),
  email: z.string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
  remember_me: z.boolean().optional()
});

export const SignInFormSchema: z.ZodType<Partial<SignUpData>> = z.object({
  email: z.string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
  remember_me: z.boolean().optional()
})


export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  remember_me?: boolean;
}


export const ProfileUpdateSchema: z.ZodType<ProfileUpdate> = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters long')
    .max(30, 'First name must be at most 30 characters long')
    .regex(/^[A-Za-z]+$/, 'First name must contain only alphabetic characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(30, 'Last name must be at most 30 characters long')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters'),
  email: z.string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character').optional(),
  oldPassword: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character').optional(),
}).refine(data => {
  if (data.newPassword && !data.oldPassword) {
    return false;
  }
  return true;
}, {
  message: "Old password must be provided if a new password is given",
  path: ['newPassword'] // This will show the error on the newPassword field
});;


export type ProfileUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  newPassword?: string;
  oldPassword?: string;
}


export interface GenerationResponse{
  jobID: string
  status:"Generating"|"Generated"|"Failed"|"NotFound"
  output?:GenerationOutput|null
}


export interface GenerationOutput{
  outputPath?:string
  prompt:string
  duration:string
}

export interface SocketErrorResponse{
  event: string,
  data: SocketError,
  message: string,
}

export interface SocketError {
  reason:"TokenExpired"|"NoOutput";
  message:string;
}