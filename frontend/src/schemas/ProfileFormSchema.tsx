import z from 'zod';

export const ProfileSchema = z.object({
  firstName: z.string().trim().min(3, 'Full name must be at least 3 characters'),

  dob: z
    .string()
    .refine((date) => new Date(date) < new Date(), {
      message: 'Please enter a valid date of birth',
    })
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message: 'Phone number must be exactly 10 digits',
    }),
});

export type ProfileFormSchema = z.infer<typeof ProfileSchema>;
