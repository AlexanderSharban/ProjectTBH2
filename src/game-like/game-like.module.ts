import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameLikeService } from './game-like.service';
import { GameLikeController } from './game-like.controller';
import { GameLike } from './entities/game-like.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([GameLike])
  ],
  controllers: [GameLikeController],
  providers: [GameLikeService],
})
export class GameLikeModule {}