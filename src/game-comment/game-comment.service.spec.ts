import { Test, TestingModule } from '@nestjs/testing';
import { GameCommentService } from './game-comment.service';

describe('GameCommentService', () => {
  let service: GameCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCommentService],
    }).compile();

    service = module.get<GameCommentService>(GameCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
