import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGameScores } from './entities/user-game-scores.entity';
import { CreateUserGameScoresDto } from './dto/create-user-game-scores.dto';
import { UpdateUserGameScoresDto } from './dto/update-user-game-scores.dto';

@Injectable()
export class UserGameScoresService {
  constructor(
    @InjectRepository(UserGameScores)
    private userGameScoresRepository: Repository<UserGameScores>,
  ) {}

  async create(createDto: CreateUserGameScoresDto): Promise<UserGameScores> {
    // Check if score exists, if yes, update if new score is higher
    const existing = await this.userGameScoresRepository.findOne({
      where: { userId: createDto.userId, gameId: createDto.gameId },
    });

    if (existing) {
      if (createDto.score > existing.maxScore) {
        existing.maxScore = createDto.score;
        existing.updatedAt = new Date();
        return this.userGameScoresRepository.save(existing);
      }
      return existing;
    }

    const userGameScore = this.userGameScoresRepository.create({
      userId: createDto.userId,
      gameId: createDto.gameId,
      maxScore: createDto.score,
    });
    return this.userGameScoresRepository.save(userGameScore);
  }

  async findAll(): Promise<UserGameScores[]> {
    return this.userGameScoresRepository.find({ relations: ['user', 'game'] });
  }

  async findOne(id: number): Promise<UserGameScores> {
    const userGameScore = await this.userGameScoresRepository.findOne({
      where: { id },
      relations: ['user', 'game'],
    });
    if (!userGameScore) {
      throw new NotFoundException(`UserGameScores with ID ${id} not found`);
    }
    return userGameScore;
  }

  async update(id: number, updateDto: UpdateUserGameScoresDto): Promise<UserGameScores> {
    const userGameScore = await this.findOne(id);
    Object.assign(userGameScore, updateDto, { updatedAt: new Date() });
    return this.userGameScoresRepository.save(userGameScore);
  }

  async remove(id: number): Promise<void> {
    const userGameScore = await this.findOne(id);
    await this.userGameScoresRepository.remove(userGameScore);
  }

  async findByGameId(gameId: number): Promise<UserGameScores[]> {
    return this.userGameScoresRepository.find({
      where: { gameId },
      relations: ['user', 'game'],
      order: { maxScore: 'DESC' },
    });
  }

  async findByUserId(userId: number): Promise<UserGameScores[]> {
    return this.userGameScoresRepository.find({
      where: { userId },
      relations: ['user', 'game'],
    });
  }
}