import { CreateOrderDetailInput } from './create-order-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDetailInput {
  @Field(() => Int)
  id: number;
}
