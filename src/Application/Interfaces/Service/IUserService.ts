import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IServiceFindById, IServiceFindMany } from "../ServiceMethodTypes/SharedServiceMethodTypes.js";
import {
  IUserServiceCreate,
  IUserServiceDelete,
  IUserServiceFindByUsername,
  IUserServiceLogin,
  IUserServiceRefreshToken,
  IUserServiceResetPassword,
  IUserServiceResetPasswordValidate,
  IUserServiceUpdate,
} from "../ServiceMethodTypes/UserServiceMethodTypes.js";

export interface IUserService {
  create(criteria: IUserServiceCreate): Promise<IUserDto>;
  findById(criteria: IServiceFindById): Promise<IUserDto>;
  findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto>;
  findMany(criteria: IServiceFindMany): Promise<IUserDto[]>;
  update(criteria: IUserServiceUpdate): Promise<void>;
  delete(criteria: IUserServiceDelete): Promise<void>;
  login(criteria: IUserServiceLogin): Promise<{ user: IUserDto; accessToken: string; refreshToken: string } | null>;
  refreshToken(criteria: IUserServiceRefreshToken): Promise<{ accessToken: string; refreshToken: string }>;
  resetPassword(criteria: IUserServiceResetPassword): Promise<void>;
  sendResetPasswordEmail_JobHandler(criteria: IUserServiceResetPassword): Promise<any>;
  resetPasswordValidate(criteria: IUserServiceResetPasswordValidate): Promise<string>;
}
