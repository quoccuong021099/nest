import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostModel, PostStatus } from './post.model';
@Injectable()
export class PostsService {
  posts: PostModel[] = [];

  getPosts(): PostModel[] {
    return this.posts;
  }
  getPostById(id: string): PostModel {
    const found = this.posts.find((i) => i.id === id);
    if (!found) throw new NotFoundException(`Can't found id: "${id}"`);
    return found;
  }
  getPostFilter(getPostFilterDto: GetPostFilterDto): PostModel[] {
    const { search, status } = getPostFilterDto;
    let newPosts = this.getPosts();
    if (status) newPosts = newPosts.filter((item) => item.status === status);
    if (search)
      newPosts = newPosts.filter((item) => {
        if (
          item.desc.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
        )
          return true;
        else return false;
      });
    return newPosts;
  }

  createPost(creatPostDto: CreatePostDto): PostModel {
    const { title, desc } = creatPostDto;
    const newPost = {
      id: uuid(),
      title,
      desc,
      status: PostStatus.OPEN,
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): PostModel {
    const { title, desc } = updatePostDto;
    const found = this.getPostById(id);
    if (!found) throw new NotFoundException(`Not found id:"${id}"`);
    found.title = title;
    found.desc = desc;
    return found;
  }

  updatePostStatus(id: string, status: PostStatus): PostModel {
    const found = this.getPostById(id);
    if (!found) throw new NotFoundException(`Not found id:"${id}"`);
    found.status = status;
    return found;
  }

  deletePost(id: string): void {
    const find = this.getPostById(id);
    if (!find) throw new NotFoundException(`Not found id:"${id}"`);
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
