import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoLikeService } from './project-photo-like.service';

describe('ProjectPhotoLikeService', () => {
  let service: ProjectPhotoLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPhotoLikeService],
    }).compile();

    service = module.get<ProjectPhotoLikeService>(ProjectPhotoLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
