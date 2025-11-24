import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectPhotoController } from './project-photo.controller';
import { ProjectPhotoService } from './project-photo.service';
import { ProjectPhoto } from './entities/project-photo.entity';

describe('ProjectPhotoController', () => {
  let controller: ProjectPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPhotoController],
      providers: [
        ProjectPhotoService,
        { provide: getRepositoryToken(ProjectPhoto), useValue: {} },
      ],
    }).compile();

    controller = module.get<ProjectPhotoController>(ProjectPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
