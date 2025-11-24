import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorLike } from './entities/creator-like.entity';
import { CreateCreatorLikeDto } from './dto/create-creator-like.dto';
import { UpdateCreatorLikeDto } from './dto/update-creator-like.dto';

@Injectable()
export class CreatorLikeService {
  private creatorLikes: CreatorLike[] = [];
  private idCounter = 1;

  async create(createCreatorLikeDto: CreateCreatorLikeDto): Promise<CreatorLike> {
    const creatorLike: CreatorLike = {
      id: this.idCounter++,
      ...createCreatorLikeDto,
      creator: { id: createCreatorLikeDto.creatorId } as any,
    } as any;
    this.creatorLikes.push(creatorLike);
    return creatorLike;
  }

  async findAll(): Promise<CreatorLike[]> {
    return this.creatorLikes;
  }

  async findOne(id: number): Promise<CreatorLike> {
    const creatorLike = this.creatorLikes.find(f => f.id === id);
    if (!creatorLike) {
      throw new NotFoundException(`CreatorLike with ID ${id} not found`);
    }
    return creatorLike;
  }

  async update(id: number, updateCreatorLikeDto: UpdateCreatorLikeDto): Promise<CreatorLike> {
    const creatorLike = await this.findOne(id);
    Object.assign(creatorLike, updateCreatorLikeDto);
    return creatorLike;
  }

  async remove(id: number): Promise<void> {
    const index = this.creatorLikes.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`CreatorLike with ID ${id} not found`);
    }
    this.creatorLikes.splice(index, 1);
  }

  
}