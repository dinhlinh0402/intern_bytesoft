import { Resolver, Query, Args } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) { }

  @Query(() => [Customer], { name: 'customers' })
  findAll() {
    return this.customersService.findAll();
  }

  @Query(() => Customer, { name: 'customer' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.customersService.findById(id);
  }

}
