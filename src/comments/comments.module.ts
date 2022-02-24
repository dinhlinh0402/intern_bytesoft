import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CustomersModule, OrdersModule, OrderDetailModule, ProductsModule],
  providers: [CommentsResolver, CommentsService]
})
export class CommentsModule { }
