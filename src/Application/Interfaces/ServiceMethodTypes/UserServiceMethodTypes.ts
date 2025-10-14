import { IAuthRefreshTokenRequest, IAuthResetPasswordRequest, IUserLoginRequest } from "../Request/AuthRequests.js";
import { IUserCreateRequest, IUserUpdateRequest } from "../Request/UserRequests.js";

export type IUserServiceCreate = IUserCreateRequest;
export type IUserServiceDelete = { id: number };
export type IUserServiceFindByUsername = { username: string };
export type IUserServiceLogin = IUserLoginRequest;
export type IUserServiceRefreshToken = IAuthRefreshTokenRequest;
export type IUserServiceResetPassword = IAuthResetPasswordRequest;
export type IUserServiceUpdate = IUserUpdateRequest;
