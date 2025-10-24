import { IFindManyQueryRequest } from "../Request/SharedRequests.js";

export type IServiceFindById = number;
export type IServiceFindMany = IFindManyQueryRequest;
export interface IServiceFindOne {
  field: string;
  value: string;
}
