import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput {
  @Field(() => String)
  id: string;

  @Field()
  fullName: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  avatar?: string;
}
