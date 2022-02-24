import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { CreateOrderDetailInput } from 'src/order-detail/dto/create-order-detail.input';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order)
  private orderRepository: Repository<Order>,
    private productService: ProductsService,
    @Inject(forwardRef(() => OrderDetailService))
    private orderDetailService: OrderDetailService,
    private customersService: CustomersService
  ) { }

  async create(createOrderInput: CreateOrderInput, idCustomer: string) {
    const { customerId } = createOrderInput
    if (customerId !== idCustomer) {
      throw new UnauthorizedException()
    }

    // console.log('create order: ', createOrderInput);
    // return 'This action adds a new order';
    let totalMoney = 0;
    let { order_detail, } = createOrderInput;
    const orderDetail = await Promise.all(order_detail.map(async (item) => {
      const product = await this.productService.findOne(item.productId)
      let price = product.sale_price ? product.sale_price : product.price;
      let total = price * item.quantity;
      totalMoney += total;
      // console.log(totalMoney)
      let newOrderDetails: CreateOrderDetailInput = {
        ...item,
        total
      }
      return newOrderDetails;
    }))

    // console.log(orderDetail);


    const order = {
      customerId,
      created_at: new Date(),
      updated_at: new Date(),
      total: totalMoney,
    }

    const createOrder = this.orderRepository.create(order)

    const saveOrder = await this.orderRepository.save(createOrder)
    // console.log(saveOrder);

    await this.orderDetailService.create(orderDetail, saveOrder.id)
    return saveOrder
  }

  getCustomer(customerId: string) {
    return this.customersService.findById(customerId)
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['order_detail'],
      order: {
        created_at: 'DESC',
      }
    });
  }

  findOne(id: string) {
    return this.orderRepository.findOne(id, {
      relations: ['order_detail']
    });
  }

  async getAllOrdersOfCustomer(customerId: string) {
    return this.orderRepository.find({
      where: { customerId: customerId },
      relations: ['order_detail'],
      order: {
        created_at: 'DESC'
      }
    })

  }

  async update(updateOrderInput: UpdateOrderInput) {
    const { id, status } = updateOrderInput
    const order = await this.orderRepository.findOne(id)
    if (!order) {
      throw new BadRequestException('Order does not exist!!')
    }

    return this.orderRepository.save({
      ...order,
      status
    })

    // return this.orderRepository.update({ id }, { status })
  }


}
