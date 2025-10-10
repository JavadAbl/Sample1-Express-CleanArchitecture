export type IUserCreateRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  image: string | null;
};
