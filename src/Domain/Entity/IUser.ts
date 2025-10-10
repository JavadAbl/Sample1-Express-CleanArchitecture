// import { User } from "#Infrastructure/Database/Prisma/index.js";

export type IUser = {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  image: string | null;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isActive: boolean;
  resetPasswordToken: string | null;
  createdAt: Date;
  updatedAt: Date;
};
