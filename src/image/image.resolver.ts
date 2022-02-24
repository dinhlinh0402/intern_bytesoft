import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Product } from 'src/products/entities/product.entity';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) { }

  @Mutation(() => Image)
  createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imageService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'images' })
  findAll() {
    return this.imageService.findAll();
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.imageService.findOne(id);
  }

  @Mutation(() => Image)
  updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return this.imageService.update(updateImageInput);
  }

  @Mutation(() => String)
  removeImage(@Args('id', { type: () => String }) id: string) {
    return this.imageService.remove(id);
  }

  @ResolveField(() => Product)
  product(@Parent() image: Image) {
    return this.imageService.getProduct(image.productId);
  }
}
