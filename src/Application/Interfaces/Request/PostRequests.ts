import { IGetManyQueryRequest } from "./SharedRequests.js";

export type IPostCreateRequest = {
  title: string;
  content?: string;
};

export type IPostFindManyRequest = IGetManyQueryRequest & {
  userId: number;
};

export type IPostUpdateRequest = {
  id: number;
  title?: string;
  content?: string;
};
export type IPostDeleteRequest = {
  id: number;
};
