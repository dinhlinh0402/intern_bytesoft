import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  sale_price?: number

  @Field({ nullable: true })
  thumbnail?: string

  @Field({ nullable: true })
  categoryId?: string
}
