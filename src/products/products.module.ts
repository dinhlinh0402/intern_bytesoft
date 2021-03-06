import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsController } from './products.controller';
import { FileModule } from 'src/uploadfile/file.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, FileModule, forwardRef(() => ImageModule)],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
