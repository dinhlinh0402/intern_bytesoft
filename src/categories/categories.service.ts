import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) { }

  async create(createCategoryInput: CreateCategoryInput) {
    const { name } = createCategoryInput
    if (!name) {
      throw new BadRequestException('Missing parameters')
    }

    const newCategory = {
      ...createCategoryInput,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const createCategory = this.categoryRepository.create(newCategory)

    return this.categoryRepository.save(createCategory)
  }

  findAll() {
    return this.categoryRepository.find({
      relations: ['products']
    });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id, {
      relations: ['products']
    });
  }

  async update(updateCategoryInput: UpdateCategoryInput) {
    const { id, ...data } = updateCategoryInput

    const category = await this.categoryRepository.findOne(id)
    if (!category) {
      throw new BadRequestException('Category does not exist')
    }
    const newData = {
      ...data,
      updated_at: new Date()
    }

    await this.categoryRepository.update(id, data);
    return this.findOne(id)
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products']
    })
    if (!category) {
      throw new BadRequestException('Category does not exist')
    }


    await this.categoryRepository.delete(id)

    return category
  }
}
