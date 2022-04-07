import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image)
  private imageRepository: Repository<Image>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService
  ) { }

  create(createImageInput: CreateImageInput) {
    const { image_url, productId } = createImageInput
    if (!image_url) {
      throw new BadRequestException('Missing parameter')
    }

    const newImage = {
      image_url,
      productId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const createImage = this.imageRepository.create(newImage);

    return this.imageRepository.save(createImage)
  }

  async createListImages(listImage: CreateImageInput[]): Promise<Image[]> {
    const createImage = this.imageRepository.create(listImage);
    return await this.imageRepository.save(createImage)
  }

  async updateImages(listImage: string[], product: Product) {
    const listOldImage = product.images.map(image => image.image_url)

    for (const image of listImage) {
      const isExist = listOldImage.includes(image)
      if (isExist) break;

      const newUrlImage = {
        image_url: image,
        productId: product.id,
        updated_at: new Date(),
      }
      const createUrlImage = this.imageRepository.create(newUrlImage);
      await this.imageRepository.save(createUrlImage)
    }
  }

  // async findAll() {
  //   let a = await this.imageRepository.find();
  //   console.log('data: ', a);

  //   return a
  // }

  // left join: Lấy tất cả image, nếu image nào có productId thì trả về product{...} nếu ko có sẽ cho product: null
  /* async findAll() {
    const a = await this.imageRepository
      .createQueryBuilder('img')
      .leftJoinAndSelect('img.product', 'p')
      .where('True')
      .getMany()

    console.log('dâta:', a);
    return a

  } */

  // inner join: Chỉ lấy những cái image nào chứa productId(Hợp của image vs product)
  async findAll() {
    let a = await this.imageRepository
      .createQueryBuilder('img')
      // .innerJoinAndSelect('img.product', 'p')
      .where('True')

    // const 
    let b = await a.innerJoin('img.product', 'p').getMany()

    console.log('dâta:', b);
    return b
  }

  findOne(id: string) {
    return this.imageRepository.findOne(id);
  }

  async update(updateImageInput: UpdateImageInput) {
    const { id, ...data } = updateImageInput
    const image = await this.findOne(id)
    if (!image) {
      throw new BadRequestException('image not found')
    }

    const dataUpdate = {
      ...data,
      updated_at: new Date()
    }

    return this.imageRepository.update(id, dataUpdate);
  }

  async remove(id: string) {
    const image = await this.findOne(id)
    if (!image) {
      throw new BadRequestException('image not found')
    }

    await this.imageRepository.delete(id)

    return 'Deleted Image!'
  }

  getProduct(productId: string) {
    return this.productsService.findOne(productId)
  }
}
