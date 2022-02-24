import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { JwtUserAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Mutation(() => Category)
  @UseGuards(JwtUserAuthGuard)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
    // console.log(createCategoryInput)
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JwtUserAuthGuard)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(JwtUserAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  @UseGuards(JwtUserAuthGuard)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
    return this.categoriesService.update(updateCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(JwtUserAuthGuard)
  deleteCategory(@Args('id', { type: () => String }) id: string) {
    return this.categoriesService.remove(id);
  }
}
