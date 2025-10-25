import { IUserDto } from "#Application/Interfaces/Dto/User/IUserDto.js";
import { IFindByIdService, IFindManyService } from "../ServiceMethodTypes/SharedMethodTypes.js";
import {
  IUserServiceCreate,
  IUserServiceDelete,
  IUserServiceFindByUsername,
  IUserServiceLogin,
  IUserServiceRefreshToken,
  IUserServiceResetPassword,
  IUserServiceResetPasswordValidate,
  IUserServiceUpdate,
} from "../ServiceMethodTypes/UserMethodTypes.js";

export interface IUserService {
  create(criteria: IUserServiceCreate): Promise<IUserDto>;
  findById(criteria: IFindByIdService): Promise<IUserDto>;
  findByUsername(criteria: IUserServiceFindByUsername): Promise<IUserDto>;
  findMany(criteria: IFindManyService): Promise<IUserDto[]>;
  update(criteria: IUserServiceUpdate): Promise<void>;
  delete(criteria: IUserServiceDelete): Promise<void>;
  login(criteria: IUserServiceLogin): Promise<{ user: IUserDto; accessToken: string; refreshToken: string } | null>;
  refreshToken(criteria: IUserServiceRefreshToken): Promise<{ accessToken: string; refreshToken: string }>;
  resetPassword(criteria: IUserServiceResetPassword): Promise<void>;
  sendResetPasswordEmail_JobHandler(criteria: IUserServiceResetPassword): Promise<any>;
  resetPasswordValidate(criteria: IUserServiceResetPasswordValidate): Promise<string>;
}
