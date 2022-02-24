import { Field, ObjectType } from "@nestjs/graphql";
import { Customer } from "src/customers/entities/customer.entity";
import { User } from "src/user/entities/user.entity";

@ObjectType()
export class LoginCustomerResponse {
    @Field()
    access_token: string;

    @Field(() => Customer)
    customer: Customer;
}