import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectLike } from './entities/project-like.entity';
import { CreateProjectLikeDto } from './dto/create-project-like.dto';
import { UpdateProjectLikeDto } from './dto/update-project-like.dto';

@Injectable()
export class ProjectLikeService {
  private items: ProjectLike[] = [];
  private idCounter = 1;

  async create(dto: CreateProjectLikeDto): Promise<ProjectLike> {
    const rec: ProjectLike = {
      id: this.idCounter++,
      userId: dto.userId,
      projectId: dto.projectId,
      createdAt: new Date(),
      user: { id: dto.userId } as any,
      project: { id: dto.projectId } as any,
    } as any;
    this.items.push(rec);
    return rec;
  }

  async findAll(): Promise<ProjectLike[]> {
    return this.items;
  }

  async findOne(id: number): Promise<ProjectLike> {
    const r = this.items.find(i => i.id === id);
    if (!r) throw new NotFoundException(`ProjectLike with ID ${id} not found`);
    return r;
  }

  async update(id: number, dto: UpdateProjectLikeDto): Promise<ProjectLike> {
    const r = await this.findOne(id);
    Object.assign(r, dto);
    return r;
  }

  async remove(id: number): Promise<void> {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) throw new NotFoundException(`ProjectLike with ID ${id} not found`);
    this.items.splice(idx, 1);
  }
}