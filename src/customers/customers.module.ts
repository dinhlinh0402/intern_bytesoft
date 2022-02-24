import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersResolver, CustomersService],
  exports: [CustomersService]
})
export class CustomersModule { }
