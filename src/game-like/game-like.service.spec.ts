import { Test, TestingModule } from '@nestjs/testing';
import { GameLikeService } from './game-like.service';

describe('GameLikeService', () => {
  let service: GameLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameLikeService],
    }).compile();

    service = module.get<GameLikeService>(GameLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
