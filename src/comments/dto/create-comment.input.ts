import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content: string;

  @Field()
  productId: string;

  @Field()
  customerId: string;

  @Field(() => Int)
  star: number;
}
