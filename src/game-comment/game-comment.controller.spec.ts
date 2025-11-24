import { Test, TestingModule } from '@nestjs/testing';
import { GameCommentController } from './game-comment.controller';
import { GameCommentService } from './game-comment.controller';

describe('GameCommentController', () => {
  let controller: GameCommentController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameCommentController],
      providers: [GameCommentService],
    }).compile();

    controller = module.get<GameCommentController>(GameCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
