import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ImageModule } from './image/image.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql')
  }),
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    ImageModule,
    OrdersModule,
    OrderDetailModule,
    PostsModule,
    CommentsModule
  ],
  providers: [],
})
export class AppModule { }