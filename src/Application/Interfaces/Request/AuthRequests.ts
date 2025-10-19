export type IUserLoginRequest = {
  username: string;
  password: string;
};

export type IAuthRefreshTokenRequest = {
  refreshToken: string;
};

export type IAuthResetPasswordRequest = {
  username?: string;
  email?: string;
};

export type IAuthResetPasswordValidateRequest = {
  token: string;
};
