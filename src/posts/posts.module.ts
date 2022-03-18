import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UsersModule)],
  providers: [PostsService, PostResolver],
  exports: [PostsService],
})
export class PostsModule {}
