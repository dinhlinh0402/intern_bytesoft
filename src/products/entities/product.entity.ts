import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sale_price?: number;

  @Field({ nullable: true })
  @Column('boolean', { nullable: true, default: () => false })
  featured?: boolean;

  @Field({ nullable: true })
  @Column('boolean', { nullable: true })
  best_seller?: boolean;

  @Field()
  @Column()
  thumbnail: string;

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  @Field()
  categoryId: string

  @ManyToOne(() => Category, category => category.products, { onDelete: 'SET NULL' }) // Xoá Category thì productId sẽ thành null
  @Field(() => Category)
  category: Category; // { onDelete: 'SET NULL' }  { onDelete: 'CASCADE' }

  @OneToMany(() => Image, image => image.product)
  @Field(() => [Image], { nullable: true })
  images?: [Image]

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  @Field(() => [OrderDetail], { nullable: true })
  order_detail?: [OrderDetail]

  @OneToMany(() => Comment, comments => comments.product)
  @Field(() => [Comment], { nullable: true })
  comments?: [Comment]

  @Column({ nullable: true })
  @Field({ nullable: true })
  video?: string;
} 
