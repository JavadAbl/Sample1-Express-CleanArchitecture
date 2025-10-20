import z from "zod";

export const SPostCreate = z.object({
  title: z.string().min(1).max(50),
  content: z.string().max(500).optional(),
  imageId: z.number(),
});
