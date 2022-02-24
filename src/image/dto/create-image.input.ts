import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  image_url: string;

  @Field()
  productId: string;
}
