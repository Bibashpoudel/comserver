import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, jobSchems } from './job.schema';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: jobSchems }])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
