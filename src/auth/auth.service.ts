import { BadRequestException, ConsoleLogger, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerInput } from 'src/customers/dto/create-customer.input';
import { UpdateCustomerInput } from 'src/customers/dto/update-customer.input';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginCustomerInput } from './dto/login-customer.input';
import { LoginUserResponse } from './dto/login-user-response';
import { LoginUserInput } from './dto/login-user.input';
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private customerService: CustomersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email)
    if (!user) {
      throw new UnauthorizedException('User does not exist')
    }

    const verifyPassword = await argon2.verify(user.password, password)

    if (user && !verifyPassword) {
      throw new UnauthorizedException('Wrong password')
    }

    return user
  }

  async loginUser(loginUserInput: LoginUserInput): Promise<LoginUserResponse> {
    const { email } = loginUserInput
    const user = await this.validateUser(email, loginUserInput.password)

    // console.log(user);
    let { password, ...rest } = user

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
      user: rest
    }
  }

  async signupUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, fullName, phone, avatar } = createUserInput;
    if (!email || !password || !fullName || !phone) {
      throw new BadRequestException('Missing parameters');
    }
    const user = await this.userService.findOne(email);
    if (user) {
      throw new BadRequestException('email already taken')
    }

    const hashPassword = await argon2.hash(password)

    const createUser = {
      email,
      password: hashPassword,
      fullName, phone,
      avatar: avatar ? avatar : '',
      created_at: new Date(),
      updated_at: new Date(),
    }
    // console.log("createUser: ", createUser);

    return this.userService.create(createUser)

  }

  async updateUser(updateUserInput: UpdateUserInput) {
    const { id } = updateUserInput

    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const userUpdate = {
      ...updateUserInput,
      updated_at: new Date()
    }

    const data = await this.userService.update(userUpdate)
    const { password, ...rest } = data
    return rest
  }

  async deleteUser(id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.userService.remove(id)

    return 'Deleted user'
  }

  // Customer
  async signupCustomer(customerInput: CreateCustomerInput) {
    const { email, password } = customerInput

    if (!email || !password) {
      throw new BadRequestException('Missing parameters')
    }
    const customer = await this.customerService.findByEmail(email)

    if (customer) {
      throw new BadRequestException('email already taken')
    }
    const hashPassword = await argon2.hash(password)
    const createCustomer = {
      email,
      password: hashPassword,
      created_at: new Date(),
      updated_at: new Date(),
    }

    // console.log("createCustomer: ", createCustomer);

    return this.customerService.create(createCustomer)

  }

  async loginCustomer(loginCustomerInput: LoginCustomerInput) {
    const { email, password: passwordInput } = loginCustomerInput

    const customer = await this.customerService.findByEmail(email)
    if (!customer) {
      throw new BadRequestException('User does not exist')
    }

    const { password, ...data } = customer
    const verifyPassword = await argon2.verify(customer.password, passwordInput)
    if (customer && !verifyPassword) {
      throw new BadRequestException('Wrong password')
    }

    return {
      access_token: this.jwtService.sign({
        email: customer.email,
        id: customer.id
      }),
      customer: data
    }
  }

  async updateCustomer(updateCustomer: UpdateCustomerInput, dataPayload: any) {
    const { id, fullName, phone, address, avatar } = updateCustomer
    if (!id || !fullName || !phone || !address) {
      throw new BadRequestException('Missing parameters')
    }

    const customer = await this.customerService.findById(id)
    if (!customer) {
      throw new BadRequestException('User does not exist')
    } else if (customer && customer.email !== dataPayload.email) {
      throw new UnauthorizedException()
    }

    return this.customerService.update(updateCustomer)
  }

  async updateCustomerFromAdmin(updateCustomer: UpdateCustomerInput) {
    const { id, fullName, phone, address, avatar } = updateCustomer
    if (!id || !fullName || !phone || !address) {
      throw new BadRequestException('Missing parameters')
    }

    const customer = await this.customerService.findById(id)
    if (!customer) {
      throw new BadRequestException('User does not exist')
    }
    return this.customerService.update(updateCustomer)
  }

  async deleteCustomer(id: string) {
    const customer = await this.customerService.findById(id)
    if (!customer) {
      throw new BadRequestException('User does not exist')
    }

    await this.customerService.remove(id)

    return 'Deleted Customer '
  }

}
