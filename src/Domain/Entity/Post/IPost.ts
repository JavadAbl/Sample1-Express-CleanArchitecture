export type IPost = {
  id: number;
  title: string;
  content: string | null;
  image: string;
  commentCount: number;
  likeCount: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
