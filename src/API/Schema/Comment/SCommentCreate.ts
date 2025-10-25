import z from "zod";

export const SCommentCreate = z.object({
  postId: z.number().positive(),
  content: z.string().min(1).max(500),
});
