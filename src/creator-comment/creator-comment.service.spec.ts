import { Test, TestingModule } from '@nestjs/testing';
import { CreatorCommentService } from './creator-comment.service';

describe('CreatorCommentService', () => {
  let service: CreatorCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorCommentService],
    }).compile();

    service = module.get<CreatorCommentService>(CreatorCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
