import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCommentService } from './project-comment.service';
import { ProjectCommentController } from './project-comment.controller';
import { ProjectComment } from './entities/project-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectComment])
  ],
  controllers: [ProjectCommentController],
  providers: [ProjectCommentService],
})
export class ProjectCommentModule {}