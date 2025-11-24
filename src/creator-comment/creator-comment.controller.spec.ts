import { Test, TestingModule } from '@nestjs/testing';
import { CreatorCommentController } from './creator-comment.controller';
import { CreatorCommentService } from './creator-comment.service';

describe('CreatorCommentController', () => {
  let controller: CreatorCommentController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorCommentController],
      providers: [CreatorCommentService],
    }).compile();

    controller = module.get<CreatorCommentController>(CreatorCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
