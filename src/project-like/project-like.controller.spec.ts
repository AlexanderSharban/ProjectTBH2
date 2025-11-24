import { Test, TestingModule } from '@nestjs/testing';
import { ProjectLikeController } from './project-like.controller';
import { ProjectLikeService } from './project-like.service';

describe('ProjectLikeController', () => {
  let controller: ProjectLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectLikeController],
      providers: [ProjectLikeService],
    }).compile();

    controller = module.get<ProjectLikeController>(ProjectLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
