import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  avatar?: string;

}
