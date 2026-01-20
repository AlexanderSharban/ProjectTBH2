import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectLike } from './entities/project-like.entity';
import { CreateProjectLikeDto } from './dto/create-project-like.dto';
import { UpdateProjectLikeDto } from './dto/update-project-like.dto';

@Injectable()
export class ProjectLikeService {
  constructor(
    @InjectRepository(ProjectLike)
    private projectLikeRepository: Repository<ProjectLike>,
  ) {}

  async create(createProjectLikeDto: CreateProjectLikeDto): Promise<ProjectLike> {
    const projectLike = this.projectLikeRepository.create(createProjectLikeDto);
    return this.projectLikeRepository.save(projectLike);
  }

  async findAll(): Promise<ProjectLike[]> {
    return this.projectLikeRepository.find({ relations: ['user', 'project'] });
  }

  async findOne(id: number): Promise<ProjectLike> {
    const projectLike = await this.projectLikeRepository.findOne({
      where: { id },
      relations: ['user', 'project'],
    });
    if (!projectLike) {
      throw new NotFoundException(`ProjectLike with ID ${id} not found`);
    }
    return projectLike;
  }

  async update(id: number, updateProjectLikeDto: UpdateProjectLikeDto): Promise<ProjectLike> {
    const projectLike = await this.findOne(id);
    Object.assign(projectLike, updateProjectLikeDto);
    return this.projectLikeRepository.save(projectLike);
  }

  async remove(id: number): Promise<void> {
    const projectLike = await this.findOne(id);
    await this.projectLikeRepository.remove(projectLike);
  }

  async findByProjectId(projectId: number): Promise<ProjectLike[]> {
    return this.projectLikeRepository.find({
      where: { projectId },
      relations: ['user', 'project'],
    });
  }

  async findByUserAndProject(userId: number, projectId: number): Promise<ProjectLike | null> {
    return this.projectLikeRepository.findOne({
      where: { userId, projectId },
    });
  }
}