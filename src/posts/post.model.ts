export class PostModel {
  id: string;
  title: string;
  desc: string;
  status: PostStatus;
}
export enum PostStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
