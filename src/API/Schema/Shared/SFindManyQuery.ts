import { digitReg } from "#Globals/Utils/ValidationUtils.js";
import { z } from "zod";

export const SFindManyQuery = z.object({
  page: z.string().regex(digitReg, { error: "page must be a number" }).optional(),
  limit: z.string().regex(digitReg, { error: "limit must be a number" }).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  search: z.string().optional(),
});
