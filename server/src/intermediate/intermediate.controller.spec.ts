import { Test, TestingModule } from '@nestjs/testing';
import { IntermediateController } from './intermediate.controller';

describe('IntermediateController', () => {
  let controller: IntermediateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntermediateController],
    }).compile();

    controller = module.get<IntermediateController>(IntermediateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
