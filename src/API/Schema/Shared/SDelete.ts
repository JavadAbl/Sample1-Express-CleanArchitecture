import { digitReg } from "#Globals/Utils/ValidationUtils.js";
import z from "zod";

export const SDelete = z.object({
  id: z
    .string()
    .regex(digitReg, { error: "Id must be a number" })
    .transform((s) => Number(s)),
});
