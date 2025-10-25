import { IGetManyQueryRequest } from "./SharedRequests.js";

export type ICommentCreateRequest = {
  postId: number;
  content: string;
};

export type ICommentGetManyRequest = IGetManyQueryRequest & { postId: number };
