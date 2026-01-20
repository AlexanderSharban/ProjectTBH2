import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPhotoComment } from './entities/project-photo-comment.entity';
import { CreateProjectPhotoCommentDto } from './dto/create-project-photo-comment.dto';
import { UpdateProjectPhotoCommentDto } from './dto/update-project-photo-comment.dto';

@Injectable()
export class ProjectPhotoCommentService {
  constructor(
    @InjectRepository(ProjectPhotoComment)
    private projectPhotoCommentRepository: Repository<ProjectPhotoComment>,
  ) {}

  async create(createProjectPhotoCommentDto: CreateProjectPhotoCommentDto): Promise<ProjectPhotoComment> {
    const projectPhotoComment = this.projectPhotoCommentRepository.create(createProjectPhotoCommentDto);
    return this.projectPhotoCommentRepository.save(projectPhotoComment);
  }

  async findAll(): Promise<ProjectPhotoComment[]> {
    return this.projectPhotoCommentRepository.find({ relations: ['user', 'projectPhoto'] });
  }

  async findOne(id: number): Promise<ProjectPhotoComment> {
    const projectPhotoComment = await this.projectPhotoCommentRepository.findOne({ where: { id }, relations: ['user', 'projectPhoto'] });
    if (!projectPhotoComment) {
      throw new NotFoundException(`ProjectPhotoComment with ID ${id} not found`);
    }
    return projectPhotoComment;
  }

  async update(id: number, updateProjectPhotoCommentDto: UpdateProjectPhotoCommentDto): Promise<ProjectPhotoComment> {
    await this.projectPhotoCommentRepository.update(id, updateProjectPhotoCommentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectPhotoCommentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProjectPhotoComment with ID ${id} not found`);
    }
  }

  async findByProjectPhotoId(projectPhotoId: number): Promise<ProjectPhotoComment[]> {
    return this.projectPhotoCommentRepository.find({ where: { projectPhotoId }, relations: ['user'] });
  }
}