import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoLikeController } from './project-photo-like.controller';
import { ProjectPhotoLikeService } from './project-photo-like.service';

describe('ProjectPhotoLikeController', () => {
  let controller: ProjectPhotoLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPhotoLikeController],
      providers: [ProjectPhotoLikeService],
    }).compile();

    controller = module.get<ProjectPhotoLikeController>(ProjectPhotoLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});