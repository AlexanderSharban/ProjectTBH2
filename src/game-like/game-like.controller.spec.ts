import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from './game-like.controller';
import { FeatureService } from './feature.service';

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
