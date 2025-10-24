import { IPost } from "#Domain/Entity/Post/IPost.js";

export type IPostDto = {
  id: number;
  title: string;
  content: string | null;
  image: string;
  commentCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export function toPostDto(Post: IPost): IPostDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, ...dto } = Post;
  return dto as IPostDto;
}
