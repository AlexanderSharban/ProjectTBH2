import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController, GamesControllerService } from './game.controller';
import { GamesControllerController } from './game.controller';
import { Game } from './entities/game.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  controllers: [GamesController],
  providers: [GameService],
})
export class GamesModule {}