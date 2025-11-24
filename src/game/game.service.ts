import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  private games: Game[] = [];
  private idCounter = 1;

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game: Game = {
      id: this.idCounter++,
      title: createGameDto.title,
      slug: createGameDto.slug,
      description: createGameDto.description,
      creatorId: createGameDto.creatorId,
      createdAt: new Date(),
      creator: null,
      comments: [],
      likes: [],
      userGameScores: [],
    } as any;
    this.games.push(game);
    return game;
  }

  async findAll(): Promise<Game[]> {
    return this.games;
  }

  async findOne(id: number): Promise<Game> {
    const game = this.games.find(f => f.id === id);
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    return game;
  }

  async remove(id: number): Promise<void> {
    const index = this.games.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    this.games.splice(index, 1);
  }
}