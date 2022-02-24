import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => String)
  id: string;

  @Field()
  content: string;
}
