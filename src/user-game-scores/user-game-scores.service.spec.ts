import { Test, TestingModule } from '@nestjs/testing';
import { UserGameScoresService } from './user-game-scores.service';

describe('UserGameScoresService', () => {
  let service: UserGameScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGameScoresService],
    }).compile();

    service = module.get<UserGameScoresService>(UserGameScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
