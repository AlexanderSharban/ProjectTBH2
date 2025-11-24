import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectLikeService } from './project-like.service';
import { ProjectLikeController } from './project-like.controller';
import { ProjectLike } from './entities/project-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectLike])
  ],
  controllers: [ProjectLikeController],
  providers: [ProjectLikeService],
})
export class ProjectLikeModule {}