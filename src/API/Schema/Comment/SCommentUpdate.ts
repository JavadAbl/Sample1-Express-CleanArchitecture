import z from "zod";

export const SCommentUpdate = z.object({
  id: z.number().positive(),
  content: z.string().min(1).max(500),
});
