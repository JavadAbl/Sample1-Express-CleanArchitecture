import { ICommentCreateRequest, ICommentGetManyRequest, ICommentUpdateRequest } from "../Request/CommentRequests.js";
import { IDeleteRequest } from "../Request/SharedRequests.js";

export type ICommentFindManyService = ICommentGetManyRequest & { userId: number };
export type ICommentCreateService = ICommentCreateRequest & { userId: number };
export type ICommentUpdateService = ICommentUpdateRequest & { userId: number };
export type ICommentDeleteService = IDeleteRequest & { userId: number };
