import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectsController } from './project.controller';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectsController],
  providers: [ProjectService],
})
export class ProjectModule {}