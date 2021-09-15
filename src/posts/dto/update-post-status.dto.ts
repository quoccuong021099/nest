import { IsEnum, IsOptional } from 'class-validator';
import { PostStatus } from '../post.model';

export class UpdatePostStatusDto {
  @IsOptional()
  @IsEnum(PostStatus)
  status: PostStatus;
}
