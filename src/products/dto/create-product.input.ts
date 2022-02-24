import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string

  @Field()
  price: number;

  @Field({ nullable: true })
  sale_price?: number

  @Field()
  thumbnail: string

  @Field()
  categoryId: string
}
