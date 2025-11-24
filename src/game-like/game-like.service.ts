import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLike } from './entities/game-like.entity';
import { CreateGameLikeDto } from './dto/create-game-like.dto';
import { UpdateGameLikeDto } from './dto/update-game-like.dto';

@Injectable()
export class GameLikeService {
  private gameLikes: GameLike[] = [];
  private idCounter = 1;

  async create(createGameLikeDto: CreateGameLikeDto): Promise<GameLike> {
    const gameLike: GameLike = {
      id: this.idCounter++,
      ...createGameLikeDto,
      game: { id: createGameLikeDto.gameId } as any,
    } as any;
    this.gameLikes.push(gameLike);
    return gameLike;
  }

  async findAll(): Promise<GameLike[]> {
    return this.gameLikes;
  }

  async findOne(id: number): Promise<GameLike> {
    const gameLike = this.gameLikes.find(f => f.id === id);
    if (!gameLike) {
      throw new NotFoundException(`GameLike with ID ${id} not found`);
    }
    return gameLike;
  }

  async update(id: number, updateGameLikeDto: UpdateGameLikeDto): Promise<GameLike> {
    const gameLike = await this.findOne(id);
    Object.assign(gameLike, updateGameLikeDto);
    return gameLike;
  }

  async remove(id: number): Promise<void> {
    const index = this.gameLikes.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`GameLike with ID ${id} not found`);
    }
    this.gameLikes.splice(index, 1);
  }

  
}