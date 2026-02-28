import { Module } from '@nestjs/common';
import { JobPostsService } from './job-posts.service';

@Module({
  providers: [JobPostsService]
})
export class JobPostsModule {}
