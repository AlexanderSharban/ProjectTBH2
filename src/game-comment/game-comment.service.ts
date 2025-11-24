import { Injectable, NotFoundException } from '@nestjs/common';
import { GameComment } from './entities/game-comment.entity';
import { CreateGameCommentDto } from './dto/create-game-comment.dto';
import { UpdateGameCommentDto } from './dto/update-game-comment.dto';

@Injectable()
export class GameCommentService {
  private gameComments: GameComment[] = [];
  private idCounter = 1;

  async create(createGameCommentDto: CreateGameCommentDto): Promise<GameComment> {
    const gameComment: GameComment = {
      id: this.idCounter++,
      ...createGameCommentDto,
      game: { id: createGameCommentDto.gameId } as any,
    } as any;
    this.gameComments.push(gameComment);
    return gameComment;
  }

  async findAll(): Promise<GameComment[]> {
    return this.gameComments;
  }

  async findOne(id: number): Promise<GameComment> {
    const gameComment = this.gameComments.find(f => f.id === id);
    if (!gameComment) {
      throw new NotFoundException(`GameComment with ID ${id} not found`);
    }
    return gameComment;
  }

  async update(id: number, updateGameCommentDto: UpdateGameCommentDto): Promise<GameComment> {
    const gameComment = await this.findOne(id);
    Object.assign(gameComment, updateGameCommentDto);
    return gameComment;
  }

  async remove(id: number): Promise<void> {
    const index = this.gameComments.findIndex(f => f.id === id);
    if (index === -1) {
      throw new NotFoundException(`GameComment with ID ${id} not found`);
    }
    this.gameComments.splice(index, 1);
  }

  async findByGameId(gameId: number): Promise<GameComment[]> {
    return this.gameComments.filter(f => f.gameId === gameId);
  }
}