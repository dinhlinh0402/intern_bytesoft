import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  content: string

  @Field(() => Number)
  @Column()
  star: number

  @Field(() => Date, { nullable: true })
  @Column()
  created_at?: Date

  @Field(() => Date, { nullable: true })
  @Column()
  updated_at?: Date

  @ManyToOne(() => Product, product => product.comments)
  @Field(() => Product)
  product: Product;

  @Field()
  @Column()
  productId: string;

  @ManyToOne(() => Customer, customer => customer.comments)
  @Field(() => Customer)
  customer: Customer;

  @Field()
  @Column()
  customerId: string;
}
