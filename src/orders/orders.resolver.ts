import { Resolver, Query, Mutation, Args, Int, Context, Parent, ResolveField } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { JwtCustomerAuthGuard, JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Customer } from 'src/customers/entities/customer.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) { }

  @Mutation(() => Order)
  @UseGuards(JwtCustomerAuthGuard)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context
  ) {
    // console.log('context', context.req.user.id);
    const { id: idCustomer } = context.req.user

    // console.log('idCustomer: ', idCustomer);

    return this.ordersService.create(createOrderInput, idCustomer);
  }

  @ResolveField(() => Customer)
  customer(@Parent() order: Order) {
    return this.ordersService.getCustomer(order.customerId)
  }

  @Query(() => [Order], { name: 'orders' })
  @UseGuards(JwtUserAuthGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(JwtUserAuthGuard)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput);
  }

  // @Mutation(() => Order)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.ordersService.remove(id);
  // }

  @Query(() => [Order])
  @UseGuards(JwtCustomerAuthGuard)
  getAllOrdersOfCustomer(@Args('customerId', { type: () => String }) customerId: string) {
    return this.ordersService.getAllOrdersOfCustomer(customerId)
  }

}
