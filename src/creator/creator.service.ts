import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from './entities/creator.entity';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private creatorRepository: Repository<Creator>,
  ) {}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const creator = this.creatorRepository.create(createCreatorDto);
    return this.creatorRepository.save(creator);
  }

  async findAll(): Promise<Creator[]> {
    return this.creatorRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${id} not found`);
    }
    return creator;
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const creator = await this.findOne(id);
    Object.assign(creator, updateCreatorDto);
    return this.creatorRepository.save(creator);
  }

  async remove(id: number): Promise<void> {
    const creator = await this.findOne(id);
    await this.creatorRepository.remove(creator);
  }

  async findByUserId(userId: number): Promise<Creator | null> {
    return this.creatorRepository.findOne({
      where: { userId },
      relations: ['user'],
    });
  }
}