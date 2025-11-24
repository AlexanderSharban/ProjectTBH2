import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorComment } from './entities/creator-comment.entity';
import { CreateCreatorCommentDto } from './dto/create-creator-comment.dto';
import { UpdateCreatorCommentDto } from './dto/update-creator-comment.dto';

@Injectable()
export class CreatorCommentService {
  private creatorComments: CreatorComment[] = [];
  private idCounter = 1;

  async create(createCreatorCommentDto: CreateCreatorCommentDto): Promise<CreatorComment> {
    const creatorComment: CreatorComment = {
      id: this.idCounter++,
      ...createCreatorCommentDto,
      creator: { id: createCreatorCommentDto.creatorId } as any,
    } as any;
    this.creatorComments.push(creatorComment);
    return creatorComment;
  }

  async findAll(): Promise<CreatorComment[]> {
    return this.creatorComments;
  }

  async findOne(id: number): Promise<CreatorComment> {
    const creatorComment = this.creatorComments.find(f => f.id === id);
    if (!creatorComment) {
      throw new NotFoundException(`CreatorComment with ID ${id} not found`);
    }
    return creatorComment;
  }

  async update(id: number, updateCreatorCommentDto: UpdateCreatorCommentDto): Promise<CreatorComment> {
    const creatorComment = await this.findOne(id);
    Object.assign(creatorComment, updateCreatorCommentDto);
    return creatorComment;
  }

  async remove(id: number): Promise<void> {
    const index = this.creatorComments.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`CreatorComment with ID ${id} not found`);
    }
    this.creatorComments.splice(index, 1);
  }

  
}