import { z } from "zod";

export const SAuthResetPasswordValidate = z.object({
  token: z.string(),
});
