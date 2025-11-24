import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoService } from './project-photo.service';

describe('ProjectPhotoService', () => {
  let service: ProjectPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPhotoService],
    }).compile();

    service = module.get<ProjectPhotoService>(ProjectPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
