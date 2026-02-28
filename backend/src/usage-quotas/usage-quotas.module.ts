import { Module } from '@nestjs/common';
import { UsageQuotasService } from './usage-quotas.service';

@Module({
  providers: [UsageQuotasService]
})
export class UsageQuotasModule {}
