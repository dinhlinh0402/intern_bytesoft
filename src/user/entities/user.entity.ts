import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @Column()
  created_at: Date;

  @Field({ nullable: true })
  @Column()
  updated_at: Date;

  @OneToMany(() => Post, post => post.user)
  @Field(() => [Post], { nullable: true })
  posts?: [Post]

}
