import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column()
  created_at: Date;

  @Field({ nullable: true })
  @Column()
  updated_at: Date;

  @OneToMany(() => Product, product => product.category)
  @Field(() => [Product], { nullable: true })
  products?: [Product]
}
