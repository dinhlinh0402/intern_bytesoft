import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateOrderDetailInput } from 'src/order-detail/dto/create-order-detail.input';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';

@InputType()
export class CreateOrderInput {
  // @Field()
  // status: boolean;

  @Field()
  customerId: string;

  @Field(() => [CreateOrderDetailInput])
  order_detail: [CreateOrderDetailInput]
}
