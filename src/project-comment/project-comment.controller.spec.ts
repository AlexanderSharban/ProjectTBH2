import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCommentController } from './project-comment.controller';
import { ProjectCommentService } from './project-comment.service';

describe('ProjectCommentController', () => {
  let controller: ProjectCommentController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCommentController],
      providers: [ProjectCommentService],
    }).compile();

    controller = module.get<ProjectCommentController>(ProjectCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
