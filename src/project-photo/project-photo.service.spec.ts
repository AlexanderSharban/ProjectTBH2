import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectPhotoService } from './project-photo.service';
import { ProjectPhoto } from './entities/project-photo.entity';

describe('ProjectPhotoService', () => {
  let service: ProjectPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectPhotoService,
        { provide: getRepositoryToken(ProjectPhoto), useValue: {} },
      ],
    }).compile();

    service = module.get<ProjectPhotoService>(ProjectPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
