import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from './creator.controller';
import { CreatorService } from './creator.service';

describe('CreatorController', () => {
  let controller: CreatorsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
      providers: [CreatorService],
    }).compile();

    controller = module.get<CreatorsController>(CreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
