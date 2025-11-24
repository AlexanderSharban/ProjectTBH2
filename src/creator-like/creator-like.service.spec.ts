import { Test, TestingModule } from '@nestjs/testing';
import { CreatorLikeService } from './creator-like.service';

describe('CreatorLikeService', () => {
  let service: CreatorLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorLikeService],
    }).compile();

    service = module.get<CreatorLikeService>(CreatorLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
