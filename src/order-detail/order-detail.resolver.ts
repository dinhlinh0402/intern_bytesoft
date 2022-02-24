import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Resolver(() => OrderDetail)
export class OrderDetailResolver {
  constructor(private readonly orderDetailService: OrderDetailService) { }

  // @Mutation(() => OrderDetail)
  // createOrderDetail(@Args('createOrderDetailInput') createOrderDetailInput: CreateOrderDetailInput) {
  //   return this.orderDetailService.create(createOrderDetailInput);
  // }

  @Query(() => [OrderDetail], { name: 'orderDetail' })
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Query(() => OrderDetail, { name: 'orderDetail' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderDetailService.findOne(id);
  }

  @ResolveField(() => Order)
  order(@Parent() orderDetail: OrderDetail) {
    // console.log(orderDetail);
    return this.orderDetailService.getOrder(orderDetail.orderId)
  }

  @ResolveField(() => Product)
  product(@Parent() orderDetail: OrderDetail) {
    return this.orderDetailService.getProductOfOrderDetail(orderDetail.productId)
  }

  // @Mutation(() => OrderDetail)
  // updateOrderDetail(@Args('updateOrderDetailInput') updateOrderDetailInput: UpdateOrderDetailInput) {
  //   return this.orderDetailService.update(updateOrderDetailInput.id, updateOrderDetailInput);
  // }

  // @Mutation(() => OrderDetail)
  // removeOrderDetail(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderDetailService.remove(id);
  // }
}
