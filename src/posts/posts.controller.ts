import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostModel } from './post.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  getPostFilter(@Query() getPostFilterDto: GetPostFilterDto): PostModel[] {
    return this.postService.getPostFilter(getPostFilterDto);
  }

  @Get()
  getPosts(): PostModel[] {
    return this.postService.getPosts();
  }
  @Get('/:id')
  getPostById(@Param('id') id: string): PostModel {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() creatPostDto: CreatePostDto): PostModel {
    return this.postService.createPost(creatPostDto);
  }

  @Patch('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostModel {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id') id: string,
    @Body() updatePostStatusDto: UpdatePostStatusDto,
  ): PostModel {
    const { status } = updatePostStatusDto;
    return this.postService.updatePostStatus(id, status);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): void {
    return this.postService.deletePost(id);
  }
}
