import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image)
  private imageRepository: Repository<Image>,
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

  findAll() {
    return this.imageRepository.find();
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
