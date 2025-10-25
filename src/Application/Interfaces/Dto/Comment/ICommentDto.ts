import { IComment } from "#Domain/Entity/Comment/IComment.js";

export type ICommentDto = {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export function toCommentDto(Comment: IComment): ICommentDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...dto } = Comment;
  return dto;
}
