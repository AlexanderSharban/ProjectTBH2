import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCommentService } from './game-comment.service';
import { GameCommentController } from './game-comment.controller';
import { GameComment } from './entities/game-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameComment])
  ],
  controllers: [GameCommentController],
  providers: [GameCommentService],
})
export class GameCommentModule {}