import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


@Injectable()
export class ProjectService {
  private projects: Project[] = [];
  private idCounter = 1;

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project: Project = {
      id: this.idCounter++,
      ...createProjectDto,
      creatorId: createProjectDto.creatorId,
      createdAt: new Date(),
    } as any;
    this.projects.push(project);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projects;
  }

  async findOne(id: number): Promise<Project> {
    const project = this.projects.find(p => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return project;
  }

  async remove(id: number): Promise<void> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    this.projects.splice(index, 1);
  }

  
}