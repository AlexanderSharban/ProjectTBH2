import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectComment } from './entities/project-comment.entity';
import { CreateProjectCommentDto } from './dto/create-project-comment.dto';
import { UpdateProjectCommentDto } from './dto/update-project-comment.dto';

@Injectable()
export class ProjectCommentService {
  private projectComments: ProjectComment[] = [];
  private idCounter = 1;

  async create(createProjectCommentDto: CreateProjectCommentDto): Promise<ProjectComment> {
    const projectComment: ProjectComment = {
      id: this.idCounter++,
      ...createProjectCommentDto,
      monitor: { id: createProjectCommentDto.monitorId } as any,
    };
    this.projectComments.push(projectComment);
    return projectComment;
  }

  async findAll(): Promise<ProjectComment[]> {
    return this.projectComments;
  }

  async findOne(id: number): Promise<ProjectComment> {
    const projectComment = this.projectComments.find(f => f.id === id);
    if (!projectComment) {
      throw new NotFoundException(`ProjectComment with ID ${id} not found`);
    }
    return projectComment;
  }

  async update(id: number, updateProjectCommentDto: UpdateProjectCommentDto): Promise<ProjectComment> {
    const projectComment = await this.findOne(id);
    Object.assign(projectComment, updateProjectCommentDto);
    return projectComment;
  }

  async remove(id: number): Promise<void> {
    const index = this.projectComments.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`ProjectComment with ID ${id} not found`);
    }
    this.projectComments.splice(index, 1);
  }


}