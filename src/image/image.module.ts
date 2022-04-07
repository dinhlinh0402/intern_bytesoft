import { forwardRef, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), forwardRef(() => ProductsModule)],
  providers: [ImageResolver, ImageService],
  exports: [ImageService]
})
export class ImageModule { }
