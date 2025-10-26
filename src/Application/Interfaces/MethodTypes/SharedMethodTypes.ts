import { IGetManyQueryRequest } from "../Request/SharedRequests.js";

export type IFindByIdService = { id: number };
export type IFindManyService = IGetManyQueryRequest;
export interface IFindOneService {
  field: string;
  value: string;
}
