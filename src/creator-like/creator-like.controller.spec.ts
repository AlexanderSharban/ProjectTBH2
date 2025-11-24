import { Test, TestingModule } from '@nestjs/testing';
import { CreatorLikeController } from './creator-like.controller';
import { CreatorLikeService } from './creator-like.service';

describe('CreatorLikeController', () => {
  let controller: CreatorLikeController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorLikeController],
      providers: [CreatorLikeService],
    }).compile();

    controller = module.get<CreatorLikeController>(CreatorLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
