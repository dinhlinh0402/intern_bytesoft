import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CreateCustomerInput } from 'src/customers/dto/create-customer.input';
import { UpdateCustomerInput } from 'src/customers/dto/update-customer.input';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginCustomerResponse } from './dto/login-customer-response';
import { LoginCustomerInput } from './dto/login-customer.input';
import { LoginUserResponse } from './dto/login-user-response';
import { LoginUserInput } from './dto/login-user.input';
import { JwtCustomerAuthGuard, JwtUserAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  //Login for admin
  @Mutation(() => LoginUserResponse)
  loginUser(
    @Args('loginUserInput') loginUserInput: LoginUserInput
  ) {
    // console.log('loginUserInput', loginUserInput)
    return this.authService.loginUser(loginUserInput)
  }

  @Mutation(() => User)
  @UseGuards(JwtUserAuthGuard)
  signupUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context() context
  ) {
    // console.log('createUserInput', createUserInput);
    // console.log("context: ", context.req.user);

    return this.authService.signupUser(createUserInput)
  }

  @Mutation(() => User)
  @UseGuards(JwtUserAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    // console.log('updateUserInput: ', updateUserInput);
    return this.authService.updateUser(updateUserInput)
  }

  @Mutation(() => String)
  @UseGuards(JwtUserAuthGuard)
  deleteUser(@Args('id') id: string) {
    return this.authService.deleteUser(id)
  }

  @Mutation(() => String)
  @UseGuards(JwtUserAuthGuard)
  deleteCustomer(@Args('id') id: string) {
    return this.authService.deleteCustomer(id)
  }

  @Mutation(() => Customer)
  @UseGuards(JwtUserAuthGuard)
  updateCustomerFromAdmin(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    // console.log(updateCustomerInput)
    return this.authService.updateCustomerFromAdmin(updateCustomerInput)
  }

  // Customer
  @Mutation(() => Customer)
  signupCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
    return this.authService.signupCustomer(createCustomerInput)
  }

  @Mutation(() => LoginCustomerResponse)
  loginCustomer(@Args('loginCustomerInput') loginCustomerInput: LoginCustomerInput) {
    return this.authService.loginCustomer(loginCustomerInput)
  }

  @Mutation(() => Customer)
  @UseGuards(JwtCustomerAuthGuard)
  updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
    @Context() context
  ) {
    console.log(context.req.user)
    return this.authService.updateCustomer(updateCustomerInput, context.req.user)
  }

}
