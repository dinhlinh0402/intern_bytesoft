import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  status: boolean;
}
