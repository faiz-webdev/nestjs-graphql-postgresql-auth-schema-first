import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  userId: string;
  @Column('int')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
  @Column()
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { description: 'role of the user' })
  role: string;

  @Column()
  @Field(() => String, { description: 'password of the user' })
  password: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany((_type) => Post, (post) => post.user, { eager: true })
  @OneToMany((_type) => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
