import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(@InjectRepository(OrderDetail)
  private orderDetaiRepository: Repository<OrderDetail>,
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) { }
  async create(createOrderDetailInput, orderId: string) {
    // console.log(createOrderDetailInput)
    const newOrderDetail = createOrderDetailInput.map(orderDetail => {
      return {
        ...orderDetail,
        orderId: orderId,
      }
    })
    const createOrderDetail = await this.orderDetaiRepository.create(newOrderDetail)
    return this.orderDetaiRepository.save(createOrderDetail)
  }

  findAll() {
    return this.orderDetaiRepository.find();
  }

  findOne(id: string) {
    return this.orderDetaiRepository.findOne(id);
  }

  getOrder(orderId: string) {
    return this.ordersService.findOne(orderId)
  }

  getProductOfOrderDetail(productId: string) {
    return this.productsService.findOne(productId)
  }

  getOrderDetailByOrderIdAndProductId(orderId: string, productId: string) {
    return this.orderDetaiRepository.find({
      where: { orderId, productId }
    })
  }
}
