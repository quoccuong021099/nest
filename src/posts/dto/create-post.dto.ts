import { IsNotEmpty } from 'class-validator';
import { PostStatus } from '../post.model';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  desc: string;
}
