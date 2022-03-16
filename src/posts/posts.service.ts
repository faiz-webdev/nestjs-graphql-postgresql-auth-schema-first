import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async addNewPost(createPostInput: CreatePostInput): Promise<Post> {
    const post = this.postRepository.create(createPostInput);
    return await this.postRepository.save(post);
  }

  async getAllPost(): Promise<Array<Post>> {
    return await this.postRepository.find();
  }

  async getPost(postId: string): Promise<Post> {
    return await this.postRepository.findOne(postId);
  }

  async updatePost(
    postId: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    let post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`User #${updatePostInput.postId} not found`);
    }
    post = await this.postRepository.preload({
      postId: postId,
      ...updatePostInput,
    });

    console.log('post: ', post);

    return this.postRepository.save(post);
  }
}
