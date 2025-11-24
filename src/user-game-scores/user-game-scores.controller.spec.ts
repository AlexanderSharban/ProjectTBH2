import { Test, TestingModule } from '@nestjs/testing';
import { UserGameScoresController } from './user-game-scores.controller';
import { UserGameScoresService } from './user-game-scores.service';

describe('UserGameScoresController', () => {
  let controller: UserGameScoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGameScoresController],
      providers: [UserGameScoresService],
    }).compile();

    controller = module.get<UserGameScoresController>(UserGameScoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
