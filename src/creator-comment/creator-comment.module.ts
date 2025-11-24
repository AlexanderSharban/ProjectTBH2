import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorCommentService } from './creator-comment.service';
import { CreatorCommentController } from './creator-comment.controller';
import { CreatorComment } from './entities/creator-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreatorComment])
  ],
  controllers: [CreatorCommentController],
  providers: [CreatorCommentService],
})
export class CreatorCommentModule {}