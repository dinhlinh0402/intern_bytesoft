import { CreateImageInput } from './create-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput {
  @Field(() => String)
  id: string;

  @Field()
  image_url: string
}
