import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuardService } from './api_key_guard.service';

describe('ApiKeyGuardService', () => {
  let service: ApiKeyGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyGuardService],
    }).compile();

    service = module.get<ApiKeyGuardService>(ApiKeyGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
