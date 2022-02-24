import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Float)
  @Column()
  total: number;

  @Field({ nullable: true })
  @Column()
  created_at: Date;

  @Field({ nullable: true })
  @Column()
  updated_at: Date;

  @Field(() => Boolean, { nullable: true })
  @Column('boolean', { default: false })
  status: boolean;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  @Field(() => [OrderDetail], { nullable: true })
  order_detail?: [OrderDetail];

  @ManyToOne(() => Customer, customer => customer.orders)
  @Field(() => Customer)
  customer: Customer

  @Field()
  @Column()
  customerId: string
}
