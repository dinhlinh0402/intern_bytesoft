import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
  private productRepository: Repository<Product>,
    private categoryService: CategoriesService
  ) { }
  async create(createProductInput: CreateProductInput) {
    const { name, description, price, thumbnail, categoryId } = createProductInput
    if (!name || !description || !price || !thumbnail || !categoryId) {
      throw new BadRequestException('Missing parameters')
    }

    const dataProduct = {
      ...createProductInput,
      created_at: new Date(),
      updated_at: new Date()
    }

    const createProduct = this.productRepository.create(dataProduct)
    return this.productRepository.save(createProduct)
  }

  findAll() {
    // return this.productRepository.find({
    //   relations: ['images', 'order_detail', 'comments']
    // });
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.order_detail', 'order_detail')
      .leftJoinAndSelect('product.comments', 'comments')
      .getMany()
  }

  getCategory(categoryId: string) {
    return this.categoryService.findOne(categoryId)
  }

  findOne(id: string) {
    // return this.productRepository.findOne(id, {
    //   relations: ['images', 'order_detail', 'comments'],
    // });
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.order_detail', 'order_detail')
      .leftJoinAndSelect('product.comments', 'comments')
      .where('product.id = :productId', { productId: id })
      .orderBy('comments.created_at', 'DESC')
      .getOne()
  }

  async update(updateProductInput: UpdateProductInput) {
    // console.log(updateProductInput);
    const { id, ...data } = updateProductInput
    const product = this.findOne(id)
    if (!product) {
      throw new BadRequestException('Product not found!')
    }
    const category = this.categoryService.findOne(data.categoryId)
    if (!category) {
      throw new BadRequestException('Category not found!')
    }

    const newData = {
      ...data,
      updated_at: new Date()
    }
    await this.productRepository.update(id, data)

    return this.findOne(id);
  }

  async delete(id: string) {
    const product = await this.productRepository.findOne(id)

    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.delete(id)
    return product;
  }
}
