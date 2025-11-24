import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectPhotoLike } from './entities/project-photo-like.entity';
import { CreateProjectPhotoLikeDto } from './dto/create-project-photo-like.dto';
import { UpdateProjectPhotoLikeDto } from './dto/update-project-photo-like.dto';

@Injectable()
export class ProjectPhotoLikeService {
  private items: ProjectPhotoLike[] = [];
  private idCounter = 1;

  async create(dto: CreateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    const rec: ProjectPhotoLike = {
      id: this.idCounter++,
      userId: dto.userId,
      projectPhotoId: dto.projectPhotoId,
      createdAt: new Date(),
      user: { id: dto.userId } as any,
      projectPhoto: { id: dto.projectPhotoId } as any,
    } as any;
    this.items.push(rec);
    return rec;
  }

  async findAll(): Promise<ProjectPhotoLike[]> {
    return this.items;
  }

  async findOne(id: number): Promise<ProjectPhotoLike> {
    const r = this.items.find(i => i.id === id);
    if (!r) throw new NotFoundException(`ProjectPhotoLike with ID ${id} not found`);
    return r;
  }

  async update(id: number, dto: UpdateProjectPhotoLikeDto): Promise<ProjectPhotoLike> {
    const r = await this.findOne(id);
    Object.assign(r, dto);
    return r;
  }

  async remove(id: number): Promise<void> {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) throw new NotFoundException(`ProjectPhotoLike with ID ${id} not found`);
    this.items.splice(idx, 1);
  }
}