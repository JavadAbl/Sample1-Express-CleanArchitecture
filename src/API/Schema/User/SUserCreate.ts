import { z } from "zod";

export const SUserCreate = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username cannot exceed 30 characters"),

  password: z.string().min(3, "Password must be at least 3 characters").max(64, "Password cannot exceed 64 characters"),

  email: z.email(),
});
