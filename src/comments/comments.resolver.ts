import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { JwtCustomerAuthGuard, JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) { }

  @Mutation(() => Comment)
  @UseGuards(JwtCustomerAuthGuard)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Context() context
  ) {
    const { id: customerIdFromJwt } = context.req.user
    return this.commentsService.create(createCommentInput, customerIdFromJwt);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @ResolveField(() => Customer)
  customer(@Parent() comment: Comment) {
    return this.commentsService.getCustomer(comment.customerId)
  }

  @ResolveField(() => Product)
  product(@Parent() comment: Comment) {
    return this.commentsService.getProduct(comment.productId)
  }

  // @Mutation(() => Comment)
  // updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
  //   return this.commentsService.update(updateCommentInput);
  // }

  @Mutation(() => Comment)
  @UseGuards(JwtUserAuthGuard)
  deleteComment(
    @Args('id', { type: () => String }) id: string,
  ) {

    return this.commentsService.remove(id);
  }
}
