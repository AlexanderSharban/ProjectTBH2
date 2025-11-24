import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameScoresService } from './user-game-scores.service';
import { UserGameScoresController } from './user-game-scores.controller';
import { UserGameScores } from './entities/user-game-scores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGameScores])
  ],
  controllers: [UserGameScoresController],
  providers: [UserGameScoresService],
})
export class UserGameScoresModule {}