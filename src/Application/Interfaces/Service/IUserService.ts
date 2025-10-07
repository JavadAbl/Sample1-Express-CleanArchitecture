import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IServiceFindMany } from "../ServiceCriteria/Shared/IServiceFindMany.js";
import { IUserServiceCreate } from "../ServiceCriteria/User/IUserServiceCreate.js";
import { IServiceFindById } from "../ServiceCriteria/Shared/IServiceFindById.js";
import { IUserServiceFindByUsername } from "../ServiceCriteria/User/IUserServiceFindByUsername.js";
import { IUserServiceUpdate } from "../ServiceCriteria/User/IUserServiceUpdate.js";
import { IUserServiceDelete } from "../ServiceCriteria/User/IUserServiceDelete.js";
import { IUserServiceLogin } from "../ServiceCriteria/User/IUserServiceLogin.js";

export interface IUserService {
  create(criteria: IUserServiceCreate): Promise<IUserDto>;
  findById(criteria: IServiceFindById): Promise<IUserDto>;
  findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto>;
  findMany(criteria: IServiceFindMany): Promise<IUserDto[]>;
  update(criteria: IUserServiceUpdate): Promise<void>;
  delete(criteria: IUserServiceDelete): Promise<void>;
  login(criteria: IUserServiceLogin): Promise<{ user: IUserDto; accessToken: string; refreshToken: string } | null>;
}
