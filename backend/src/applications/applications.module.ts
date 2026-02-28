import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { GenerationProcessor } from './generation.processor';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'generation' }),
    AiModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, GenerationProcessor],
  exports: [ApplicationsService],
})
export class ApplicationsModule { }
