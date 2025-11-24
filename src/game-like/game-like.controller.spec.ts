import { Test, TestingModule } from '@nestjs/testing';
import { GameLikeController } from './game-like.controller';
import { GameLikeService } from './game-like.service';

describe('GameLikeController', () => {
  let controller: GameLikeController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameLikeController],
      providers: [GameLikeService],
    }).compile();

    controller = module.get<GameLikeController>(GameLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
