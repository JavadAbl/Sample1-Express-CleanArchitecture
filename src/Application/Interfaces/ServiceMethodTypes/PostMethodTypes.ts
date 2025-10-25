import {
  IPostCreateRequest,
  IPostDeleteRequest,
  IPostFindManyRequest,
  IPostUpdateRequest,
} from "../Request/PostRequests.js";

export type IPostCreateService = IPostCreateRequest & { userId: number; image: string };
export type IPostFindManyService = IPostFindManyRequest;
export type IPostUpdateService = IPostUpdateRequest & { userId: number };
export type IPostDeleteService = IPostDeleteRequest & { userId: number };
