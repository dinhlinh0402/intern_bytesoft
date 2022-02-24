import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginCustomerInput {

    @Field()
    email: string

    @Field()
    password: string

}