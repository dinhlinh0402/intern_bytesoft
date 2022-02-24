import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  userId: string;
}
