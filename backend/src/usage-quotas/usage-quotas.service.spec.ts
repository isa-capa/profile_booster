import { Test, TestingModule } from '@nestjs/testing';
import { UsageQuotasService } from './usage-quotas.service';

describe('UsageQuotasService', () => {
  let service: UsageQuotasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageQuotasService],
    }).compile();

    service = module.get<UsageQuotasService>(UsageQuotasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
