import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class OrderDetail {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Float)
  @Column()
  total: number;

  @Field()
  @Column()
  orderId: string

  @ManyToOne(() => Order, order => order.order_detail)
  @Field(() => Order)
  order: Order

  @ManyToOne(() => Product, product => product.order_detail)
  @Field(() => Product)
  product: Product

  @Column()
  @Field()
  productId: string;
}
