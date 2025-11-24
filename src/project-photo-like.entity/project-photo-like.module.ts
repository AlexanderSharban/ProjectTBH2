import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPhotoLikeService } from './project-photo-like.service';
import { ProjectPhotoLikeController } from './project-photo-like.controller';
import { ProjectPhotoLike } from './entities/project-photo-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectPhotoLike])
  ],
  controllers: [ProjectPhotoLikeController],
  providers: [ProjectPhotoLikeService],
})
export class ProjectPhotoLikeModule {}