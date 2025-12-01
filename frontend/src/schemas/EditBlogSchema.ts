import z from 'zod';

export const editBlogSchema = z.object({
  title: z
    .string()
    .min(3)
    .transform((val) => val.trim()),
  content: z
    .string()
    .min(10)
    .transform((val) => val.trim()),
  tags: z.array(z.string().transform((tag) => tag.trim())).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),

  category: z.enum(['Technology', 'Sports', 'Politics', 'Travel', 'Education', 'Food'], {
    required_error: 'Category is required',
  }),
  existingImages: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string(),
        _id: z.string(),
      })
    )
    .optional(),
  images: z.array(z.any()).optional(),
});

export type EditBlogFormSchema = z.infer<typeof editBlogSchema>;
