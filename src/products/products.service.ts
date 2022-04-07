import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { ImageService } from 'src/image/image.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
  private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService
  ) { }
  async create(createProductInput: CreateProductInput) {
    const { name, description, price, thumbnail, categoryId, list_images, video } = createProductInput
    if (!name || !description || !price || !thumbnail || !categoryId) {
      throw new BadRequestException('Missing parameters')
    }

    const dataProduct = {
      name, description, price, thumbnail, categoryId, video,
      created_at: new Date(),
      updated_at: new Date()
    }

    const createProduct = this.productRepository.create(dataProduct)
    const product = await this.productRepository.save(createProduct)
    if (list_images && list_images.length > 0) {
      const listImages = list_images.map(image => {
        return {
          image_url: image,
          productId: product.id,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
      const res = await this.imageService.createListImages(listImages)
      return {
        ...product,
        images: [...res]
      }
    }

    return {
      ...product
    }
    // return 
  }



  async findAll() {
    // return this.productRepository.find({
    //   relations: ['images', 'order_detail', 'comments']
    // });
    const a = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.order_detail', 't')
      .leftJoinAndSelect('product.comments', 'comment')
      .getMany()

    console.log('data product: ', a);

    return a
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
      .leftJoinAndSelect('product.comments', 't')
      .where('product.id = :productId', { productId: id })
      .orderBy('t.created_at', 'DESC')
      .getOne()
  }

  async update(updateProductInput: UpdateProductInput) {
    // console.log(updateProductInput);
    const { id, list_images, ...data } = updateProductInput
    const product = await this.findOne(id)
    if (!product) {
      throw new BadRequestException('Product not found!')
    }
    const category = await this.categoryService.findOne(data.categoryId)
    if (!category) {
      throw new BadRequestException('Category not found!')
    }
    console.log(product);

    const newData = {
      ...data,
      updated_at: new Date()
    }
    await this.productRepository.update(id, newData)
    if (list_images && list_images.length > 0) {
      await this.imageService.updateImages(list_images, product)
    }

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
