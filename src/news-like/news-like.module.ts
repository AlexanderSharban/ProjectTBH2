import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLikeService } from './news-like.service';
import { NewsLikeController } from './news-like.controller';
import { NewsLike } from './entities/news-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsLike])
  ],
  controllers: [NewsLikeController],
  providers: [NewsLikeService],
})
export class NewsLikeModule {}