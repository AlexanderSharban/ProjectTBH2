import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCommentService } from './news-comment.service';
import { NewsCommentController } from './news-comment.controller';
import { NewsComment } from './entities/news-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsComment])
  ],
  controllers: [NewsCommentController],
  providers: [NewsCommentService],
})
export class NewsCommentModule {}