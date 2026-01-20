import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameComment } from './entities/game-comment.entity';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';
import { UpdateGameCommentDto } from './dto/update-game-comment.dto';

@Injectable()
export class GameCommentService {
  constructor(
    @InjectRepository(GameComment)
    private gameCommentRepository: Repository<GameComment>,
  ) {}

  async create(createGameCommentDto: CreateGameCommentDto): Promise<GameComment> {
    const gameComment = this.gameCommentRepository.create(createGameCommentDto);
    return this.gameCommentRepository.save(gameComment);
  }

  async findAll(): Promise<GameComment[]> {
    return this.gameCommentRepository.find({ relations: ['user', 'game'] });
  }

  async findOne(id: number): Promise<GameComment> {
    const gameComment = await this.gameCommentRepository.findOne({ where: { id }, relations: ['user', 'game'] });
    if (!gameComment) {
      throw new NotFoundException(`GameComment with ID ${id} not found`);
    }
    return gameComment;
  }

  async update(id: number, updateGameCommentDto: UpdateGameCommentDto): Promise<GameComment> {
    await this.gameCommentRepository.update(id, updateGameCommentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.gameCommentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GameComment with ID ${id} not found`);
    }
  }

  async findByGameId(gameId: number): Promise<GameComment[]> {
    return this.gameCommentRepository.find({ where: { gameId }, relations: ['user'] });
  }
}