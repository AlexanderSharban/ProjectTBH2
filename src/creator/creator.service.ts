import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from './entities/creator.entity';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorService {
  private creators: Creator[] = [];
  private idCounter = 1;

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator: Creator = {
      id: this.idCounter++,
      ...createCreatorDto,
      userId: createCreatorDto.userId,
      name: createCreatorDto.name,
      bio: createCreatorDto.bio,
      avatarUrl: createCreatorDto.avatarUrl,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date(),
    } as any;
    this.creators.push(creator);
    return creator;
  }

  async findAll(): Promise<Creator[]> {
    return this.creators;
  }

  async findOne(id: number): Promise<Creator> {
    const creator = this.creators.find(c => c.id === id);
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${id} not found`);
    }
    return creator;
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const creator = await this.findOne(id);
    Object.assign(creator, updateCreatorDto);
    return creator;
  }

  async remove(id: number): Promise<void> {
    const index = this.creators.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Creator with ID ${id} not found`);
    }
    this.creators.splice(index, 1);
  }

  
}