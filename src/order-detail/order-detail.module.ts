import { forwardRef, Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetail } from './entities/order-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), forwardRef(() => OrdersModule), ProductsModule],
  providers: [OrderDetailResolver, OrderDetailService],
  exports: [OrderDetailService]
})
export class OrderDetailModule { }
