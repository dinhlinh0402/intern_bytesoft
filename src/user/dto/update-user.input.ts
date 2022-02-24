import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  fullName: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  avatar: string;
}
