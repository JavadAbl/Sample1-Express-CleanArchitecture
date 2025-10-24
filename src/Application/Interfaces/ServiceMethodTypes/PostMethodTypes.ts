import { IPostCreateRequest } from "../Request/PostRequests.js";

export type IPostCreateService = IPostCreateRequest & { userId: number; image: string };
