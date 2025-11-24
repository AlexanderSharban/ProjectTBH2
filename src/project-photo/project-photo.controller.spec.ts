import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoController } from './project-photo.controller';
import { ProjectPhotoService } from './project-photo.service';

describe('ProjectPhotoController', () => {
  let controller: ProjectPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPhotoController],
      providers: [ProjectPhotoService],
    }).compile();

    controller = module.get<ProjectPhotoController>(ProjectPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
