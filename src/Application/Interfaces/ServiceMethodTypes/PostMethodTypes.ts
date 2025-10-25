import { IPostCreateRequest, IPostUpdateRequest } from "../Request/PostRequests.js";
import { IDeleteRequest, IGetManyQueryRequest } from "../Request/SharedRequests.js";

export type IPostCreateService = IPostCreateRequest & { userId: number; image: string };
export type IPostFindManyService = IGetManyQueryRequest & { userId: number };
export type IPostUpdateService = IPostUpdateRequest & { userId: number };
export type IPostDeleteService = IDeleteRequest & { userId: number };
