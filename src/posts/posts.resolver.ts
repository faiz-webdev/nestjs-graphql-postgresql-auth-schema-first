import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostsService) {}

  @Mutation(() => Post, { name: 'addNewPost' })
  addNewPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.addNewPost(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  getAllPost() {
    return this.postService.getAllPost();
  }

  @Query(() => Post, { name: 'post' })
  post(@Args('postId', { type: () => String }) postId: string) {
    return this.postService.getPost(postId);
  }

  @Mutation(() => Post, { name: 'updatePost' })
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.updatePost(updatePostInput.postId, updatePostInput);
  }
}
