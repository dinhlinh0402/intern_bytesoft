import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('text')
  description: string;

  @Field(() => String)
  @Column('text')
  content: string;

  @Field({ nullable: true })
  @Column()
  created_at?: Date;

  @Field({ nullable: true })
  @Column()
  updated_at?: Date;

  @ManyToOne(() => User, user => user.posts)
  @Field(() => User)
  user: User;

  @Field()
  @Column()
  userId: string;

}
