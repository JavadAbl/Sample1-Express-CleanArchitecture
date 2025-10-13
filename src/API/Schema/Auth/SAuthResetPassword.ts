import { z } from "zod";

export const SAuthResetPassword = z
  .object({
    username: z.string().optional(),
    email: z.string().optional(),
  })
  .refine(
    (obj) => {
      const hasUsername = typeof obj.username === "string" && obj.username.trim() !== "";
      const hasEmail = typeof obj.email === "string" && obj.email.trim() !== "";
      return (hasUsername ? 1 : 0) + (hasEmail ? 1 : 0) === 1;
    },
    {
      message: "Exactly one of `username` or `email` must be provided and non-empty.",
      path: [], // root-level error
    },
  );
