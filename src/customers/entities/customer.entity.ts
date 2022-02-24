import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column()
  created_at?: Date;

  @Field({ nullable: true })
  @Column()
  updated_at?: Date;

  @OneToMany(() => Order, order => order.customer)
  @Field(() => [Order], { nullable: true })
  orders?: [Order]

  @OneToMany(() => Comment, comments => comments.customer)
  @Field(() => [Comment], { nullable: true })
  comments?: [Comment]
}
