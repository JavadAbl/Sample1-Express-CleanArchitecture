export type IPostCreateRequest = {
  title: string;
  content?: string;
};

export type IPostUpdateRequest = {
  id: number;
  title?: string;
  content?: string;
};
