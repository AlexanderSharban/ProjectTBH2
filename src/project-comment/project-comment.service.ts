import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectComment } from './entities/project-comment.entity';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';

@Injectable()
export class ProjectCommentService {
  constructor(
    @InjectRepository(ProjectComment)
    private projectCommentRepository: Repository<ProjectComment>,
  ) {}

  async create(createProjectCommentDto: CreateProjectCommentDto): Promise<ProjectComment> {
    const projectComment = this.projectCommentRepository.create(createProjectCommentDto);
    return this.projectCommentRepository.save(projectComment);
  }

  async findAll(): Promise<ProjectComment[]> {
    return this.projectCommentRepository.find({ relations: ['user', 'project'] });
  }

  async findOne(id: number): Promise<ProjectComment> {
    const projectComment = await this.projectCommentRepository.findOne({
      where: { id },
      relations: ['user', 'project'],
    });
    if (!projectComment) {
      throw new NotFoundException(`ProjectComment with ID ${id} not found`);
    }
    return projectComment;
  }

  async update(id: number, updateProjectCommentDto: UpdateProjectCommentDto): Promise<ProjectComment> {
    const projectComment = await this.findOne(id);
    Object.assign(projectComment, updateProjectCommentDto);
    return this.projectCommentRepository.save(projectComment);
  }

  async remove(id: number): Promise<void> {
    const projectComment = await this.findOne(id);
    await this.projectCommentRepository.remove(projectComment);
  }

  async findByProjectId(projectId: number): Promise<ProjectComment[]> {
    return this.projectCommentRepository.find({
      where: { projectId },
      relations: ['user', 'project'],
      order: { createdAt: 'ASC' },
    });
  }
}