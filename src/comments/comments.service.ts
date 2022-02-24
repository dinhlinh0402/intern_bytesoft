import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment)
  private commntsRepository: Repository<Comment>,
    private customerService: CustomersService,
    private orderService: OrdersService,
    private orderDetailService: OrderDetailService,
    private productService: ProductsService
  ) { }
  async create(createCommentInput: CreateCommentInput, customerIdFromJwt: string) {
    const { customerId, productId } = createCommentInput
    if (customerIdFromJwt !== customerId) {
      throw new UnauthorizedException()
    }
    // const customer = await this.customerService.findById(customerId)
    // return console.log('customer: ', customer)
    const orders = await this.orderService.getAllOrdersOfCustomer(customerId)
    // console.log('orders: ', orders)
    // return
    let isOrder = false;
    await Promise.all(orders.map(async (order) => {
      if (order.status === true) {
        const detail = await this.orderDetailService.getOrderDetailByOrderIdAndProductId(order.id, productId)
        // console.log('detail', detail);
        if (detail && detail.length > 0) {
          isOrder = true;
        }
      }
    })
    )
    // console.log("isOrder", isOrder);

    if (!isOrder) {
      throw new BadRequestException('You are not buy product')
    }
    const comment = {
      ...createCommentInput,
      created_at: new Date(),
      updated_at: new Date()
    }
    const createComment = this.commntsRepository.create(comment)
    return this.commntsRepository.save(createComment);
  }

  findAll() {
    return this.commntsRepository.find({
      order: {
        created_at: 'DESC'
      }
    });
  }

  findOne(id: string) {
    return this.commntsRepository.findOne(id, {
      order: {
        created_at: 'DESC'
      }
    });
  }

  async remove(id: string) {
    const comment = await this.commntsRepository.findOne(id);
    if (!comment) {
      throw new BadRequestException('Comment does not exist');
    }
    await this.commntsRepository.delete(comment);
    return comment;
  }

  getCustomer(customerId: string) {
    return this.customerService.findById(customerId)
  }
  getProduct(productId: string) {
    return this.productService.findOne(productId)
  }
}
