import { IUser } from "#Domain/Entity/IUser.js";

export type IUserDto = {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toUserDto(user: IUser): IUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...dto } = user;
  return dto as IUserDto;
}
