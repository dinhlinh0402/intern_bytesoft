import { InputType, Int, Field } from '@nestjs/graphql';
import { Image } from 'src/image/entities/image.entity';

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
  categoryId: string;

  @Field(() => [String], { nullable: true })
  list_images?: [string]

  @Field({ nullable: true })
  video?: string;
}