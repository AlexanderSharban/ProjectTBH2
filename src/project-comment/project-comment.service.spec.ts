import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCommentService } from './project-comment.service';

describe('ProjectCommentService', () => {
  let service: ProjectCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectCommentService],
    }).compile();

    service = module.get<ProjectCommentService>(ProjectCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
