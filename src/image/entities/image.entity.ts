import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Image {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  image_url: string;

  @Field({ nullable: true })
  @Column()
  created_at: Date;

  @Field({ nullable: true })
  @Column()
  updated_at: Date;

  @Field()
  @Column()
  productId: string;

  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  @Field(() => Product)
  product: Product;
}
