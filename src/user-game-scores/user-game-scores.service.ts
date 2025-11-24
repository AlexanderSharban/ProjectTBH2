import { Injectable, NotFoundException } from '@nestjs/common';
import { UserGameScores } from './entities/user-game-scores.entity';
import { CreateUserGameScoresDto } from './dto/create-user-game-scores.dto';
import { UpdateUserGameScoresDto } from './dto/update-user-game-scores.dto';

@Injectable()
export class UserGameScoresService {
  private items: UserGameScores[] = [];
  private idCounter = 1;

  async create(createDto: CreateUserGameScoresDto): Promise<UserGameScores> {
    const record: UserGameScores = {
      id: this.idCounter++,
      userId: createDto.userId,
      gameId: createDto.gameId,
      maxScore: createDto.maxScore,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { id: createDto.userId } as any,
      game: { id: createDto.gameId } as any,
    } as any;
    this.items.push(record);
    return record;
  }

  async findAll(): Promise<UserGameScores[]> {
    return this.items;
  }

  async findOne(id: number): Promise<UserGameScores> {
    const rec = this.items.find(r => r.id === id);
    if (!rec) throw new NotFoundException(`UserGameScores with ID ${id} not found`);
    return rec;
  }

  async update(id: number, updateDto: UpdateUserGameScoresDto): Promise<UserGameScores> {
    const rec = await this.findOne(id);
    Object.assign(rec, updateDto, { updatedAt: new Date() });
    return rec;
  }

  async remove(id: number): Promise<void> {
    const idx = this.items.findIndex(r => r.id === id);
    if (idx === -1) throw new NotFoundException(`UserGameScores with ID ${id} not found`);
    this.items.splice(idx, 1);
  }

  async findByGameId(gameId: number): Promise<UserGameScores[]> {
    return this.items.filter(r => r.gameId === gameId);
  }
}