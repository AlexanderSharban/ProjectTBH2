import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPhotoService } from './project-photo.service';
import { ProjectPhotoController } from './project-photo.controller';
import { ProjectPhoto } from './entities/project-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectPhoto])
  ],
  controllers: [ProjectPhotoController],
  providers: [ProjectPhotoService],
})
export class ProjectPhotoModule {}