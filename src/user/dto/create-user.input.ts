import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  avatar: string;

}
