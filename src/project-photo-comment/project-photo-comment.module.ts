import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPhotoCommentService } from './project-photo-comment.service';
import { ProjectPhotoCommentController } from './project-photo-comment.controller';
import { ProjectPhotoComment } from './entities/project-photo-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectPhotoComment])
  ],
  controllers: [ProjectPhotoCommentController],
  providers: [ProjectPhotoCommentService],
})
export class ProjectPhotoCommentModule {}