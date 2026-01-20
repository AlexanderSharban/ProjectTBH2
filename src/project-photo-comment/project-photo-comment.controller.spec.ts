import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPhotoCommentController } from './project-photo-comment.controller';
import { ProjectPhotoCommentService } from './project-photo-comment.service';

describe('ProjectPhotoCommentController', () => {
  let controller: ProjectPhotoCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPhotoCommentController],
      providers: [ProjectPhotoCommentService],
    }).compile();

    controller = module.get<ProjectPhotoCommentController>(ProjectPhotoCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});