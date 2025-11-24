import { Test, TestingModule } from '@nestjs/testing';
import { NewsLikeController } from './news-like.controller';
import { NewsLikeService } from './news-like.service';

describe('NewsLikeController', () => {
  let controller: NewsLikeController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsLikeController],
      providers: [NewsLikeService],
    }).compile();

    controller = module.get<NewsLikeController>(NewsLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
