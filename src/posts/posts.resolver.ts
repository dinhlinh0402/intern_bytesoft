import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Mutation(() => Post)
  @UseGuards(JwtUserAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context
  ) {
    // console.log('context: ', context.req.user)
    // console.log('createPostInput: ', createPostInput);

    return this.postsService.create(createPostInput, context.req.user);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return this.postsService.getUser(post.userId)
  }

  @Mutation(() => Post)
  @UseGuards(JwtUserAuthGuard)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context() context
  ) {
    return this.postsService.update(updatePostInput, context.req.user);
  }

  @Mutation(() => Post)
  @UseGuards(JwtUserAuthGuard)
  deletePost(
    @Args('id', { type: () => String }) id: string,
    @Context() context
  ) {
    const { id: userId } = context.req.user
    // return console.log(id);

    return this.postsService.remove(id, userId);
  }
}
