import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../post.model';

export class GetPostFilterDto {
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
