import z from "zod";
import { SFindManyQuery } from "../Shared/SFindManyQuery.js";
import { digitReg } from "#Globals/Utils/ValidationUtils.js";

export const SCommentGetMany = SFindManyQuery.extend({
  postId: z.string().regex(digitReg, { error: "postId must be a number" }),
});
