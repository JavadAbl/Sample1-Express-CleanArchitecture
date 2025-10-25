import { z } from "zod";

export const SPostUpdate = z
  .object({
    id: z.number().min(1),
    title: z.string(),
    content: z.string(),
  })
  .partial({ title: true, content: true })
  .strict();
