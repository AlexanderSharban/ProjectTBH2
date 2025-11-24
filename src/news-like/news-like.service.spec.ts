import { Test, TestingModule } from '@nestjs/testing';
import { NewsLikeService } from './news-like.service';

describe('NewsLikeService', () => {
  let service: NewsLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsLikeService],
    }).compile();

    service = module.get<NewsLikeService>(NewsLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
