import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoCommentService } from './project-photo-comment.service';

describe('ProjectPhotoCommentService', () => {
  let service: ProjectPhotoCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPhotoCommentService],
    }).compile();

    service = module.get<ProjectPhotoCommentService>(ProjectPhotoCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});