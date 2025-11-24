import { Test, TestingModule } from '@nestjs/testing';
import { ProjectLikeService } from './project-like.service';

describe('ProjectLikeService', () => {
  let service: ProjectLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectLikeService],
    }).compile();

    service = module.get<ProjectLikeService>(ProjectLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
