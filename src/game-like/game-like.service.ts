import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLike } from './entities/game-like.entity';
import { CreateGameLikeDto } from './dto/create-game-like.dto';
import { UpdateGameLikeDto } from './dto/update-game-like.dto';

@Injectable()
export class GameLikeService {
  constructor(
    @InjectRepository(GameLike)
    private gameLikeRepository: Repository<GameLike>,
  ) {}

  async create(createGameLikeDto: CreateGameLikeDto): Promise<GameLike> {
    const gameLike = this.gameLikeRepository.create(createGameLikeDto);
    return this.gameLikeRepository.save(gameLike);
  }

  async findAll(): Promise<GameLike[]> {
    return this.gameLikeRepository.find({ relations: ['user', 'game'] });
  }

  async findOne(id: number): Promise<GameLike> {
    const gameLike = await this.gameLikeRepository.findOne({ where: { id }, relations: ['user', 'game'] });
    if (!gameLike) {
      throw new NotFoundException(`GameLike with ID ${id} not found`);
    }
    return gameLike;
  }

  async update(id: number, updateGameLikeDto: UpdateGameLikeDto): Promise<GameLike> {
    await this.gameLikeRepository.update(id, updateGameLikeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.gameLikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GameLike with ID ${id} not found`);
    }
  }

  async findByGameId(gameId: number): Promise<GameLike[]> {
    return this.gameLikeRepository.find({ where: { gameId }, relations: ['user'] });
  }
}