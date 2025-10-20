export type IPost = {
  id: number;
  title: string;
  content?: string;
  imageId: number;
  userId: number;
  commentCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
};
