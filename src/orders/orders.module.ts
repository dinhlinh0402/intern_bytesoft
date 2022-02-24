import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule, forwardRef(() => OrderDetailModule), CustomersModule],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
