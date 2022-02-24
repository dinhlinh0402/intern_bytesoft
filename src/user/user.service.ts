import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput)

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['posts']
    });
  }

  findOne(email: string): Promise<User> {
    const user = this.userRepository.findOne({
      email
    });

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  findById(id: string) {
    return this.userRepository.findOne(id, {
      relations: ['posts']
    })
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, ...data } = updateUserInput;
    // console.log(updateUserInput);
    const newData = {
      ...data,
      updated_at: new Date()
    }

    await this.userRepository.update(id, newData);

    return this.findById(id)
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
