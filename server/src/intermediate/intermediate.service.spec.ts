import { Test, TestingModule } from '@nestjs/testing';
import { IntermediateService } from './intermediate.service';

describe('IntermediateService', () => {
  let service: IntermediateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediateService],
    }).compile();

    service = module.get<IntermediateService>(IntermediateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
