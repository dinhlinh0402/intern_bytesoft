import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) { }

  create(createCustomerInput: CreateCustomerInput) {
    const newCustomer = this.customerRepository.create(createCustomerInput)
    return this.customerRepository.save(newCustomer)
  }

  findAll() {
    return this.customerRepository.find({
      relations: ['orders', 'comments']
    })
  }

  findById(id: string) {
    return this.customerRepository.findOne(id, {
      relations: ['orders', 'comments']
    });
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({ email })
  }

  async update(updateCustomerInput: UpdateCustomerInput) {
    const { id, ...data } = updateCustomerInput
    const newData = {
      ...data,
      updated_at: new Date()
    }
    await this.customerRepository.update(id, newData)

    return this.findById(id);
  }

  async remove(id: string) {
    return this.customerRepository.delete(id);
  }
}
