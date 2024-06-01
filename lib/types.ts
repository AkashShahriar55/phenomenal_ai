import * as z from "zod";

/**
 * The form schema for the code route.
 * Forces type safety on the form.
 */
export const GenerateFormSchema:z.ZodType<GenerateFormData> = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export type GenerateFormData = {
  prompt: string;
};