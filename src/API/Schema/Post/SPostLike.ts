import z from "zod";

export const SPostLike = z.object({
  postId: z.number().positive(),
});
