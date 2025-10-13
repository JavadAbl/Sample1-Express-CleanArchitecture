import { z } from "zod";

export const SAuthRefreshToken = z.object({
  refreshToken: z.string(),
});
