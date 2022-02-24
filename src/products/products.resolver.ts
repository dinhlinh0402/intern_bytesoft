import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @Mutation(() => Product)
  @UseGuards(JwtUserAuthGuard)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    // return console.log(createProductInput)
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @ResolveField(() => Category)
  category(@Parent() product: Product) {
    return this.productsService.getCategory(product.categoryId)
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput);
  }

  @Mutation(() => Product)
  deleteProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.delete(id);
  }
}
