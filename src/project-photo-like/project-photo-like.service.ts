import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPhotoLike } from './entities/project-photo-like.entity';
import { CreateProjectPhotoLikeDto } from './dto/create-project-photo-like.dto';
import { UpdateProjectPhotoLikeDto } from './dto/update-project-photo-like.dto';

@Injectable()
export class ProjectPhotoLikeService {
  constructor(
    @InjectRepository(ProjectPhotoLike)
    private projectPhotoLikeRepository: Repository<ProjectPhotoLike>,
  ) {}

  async create(createProjectPhotoLikeDto: CreateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    const projectPhotoLike = this.projectPhotoLikeRepository.create(createProjectPhotoLikeDto);
    return this.projectPhotoLikeRepository.save(projectPhotoLike);
  }

  async findAll(): Promise<ProjectPhotoLike[]> {
    return this.projectPhotoLikeRepository.find({ relations: ['user', 'projectPhoto'] });
  }

  async findOne(id: number): Promise<ProjectPhotoLike> {
    const projectPhotoLike = await this.projectPhotoLikeRepository.findOne({ where: { id }, relations: ['user', 'projectPhoto'] });
    if (!projectPhotoLike) {
      throw new NotFoundException(`ProjectPhotoLike with ID ${id} not found`);
    }
    return projectPhotoLike;
  }

  async update(id: number, updateProjectPhotoLikeDto: UpdateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    await this.projectPhotoLikeRepository.update(id, updateProjectPhotoLikeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectPhotoLikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProjectPhotoLike with ID ${id} not found`);
    }
  }

  async findByProjectPhotoId(projectPhotoId: number): Promise<ProjectPhotoLike[]> {
    return this.projectPhotoLikeRepository.find({ where: { projectPhotoId }, relations: ['user'] });
  }
}