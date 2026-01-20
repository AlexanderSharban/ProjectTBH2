import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['creator', 'comments', 'likes', 'userGameScores'] });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['creator', 'comments', 'likes', 'userGameScores'],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return this.gameRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gameRepository.remove(game);
  }
}