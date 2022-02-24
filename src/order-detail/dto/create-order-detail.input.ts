import { InputType, Int, Field } from '@nestjs/graphql';
import { OrderDetail } from '../entities/order-detail.entity';

@InputType()
export class CreateOrderDetailInput {
  @Field()
  quantity: number;

  @Field()
  productId: string;

  @Field({ nullable: true })
  total?: number;
}
