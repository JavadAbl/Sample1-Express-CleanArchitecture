import { ICommentCreateRequest } from "../Request/CommentRequests.js";

export type ICommentCreateService = ICommentCreateRequest & { userId: number };
