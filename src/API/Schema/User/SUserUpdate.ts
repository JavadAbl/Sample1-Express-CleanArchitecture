import { z } from "zod";

export const SUserUpdate = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    bio: z.string(),
  })
  .partial({ firstName: true, lastName: true, bio: true })
  .strict();
