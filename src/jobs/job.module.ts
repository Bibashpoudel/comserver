import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, jobSchems } from './job.schema';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MulterModule } from '@nestjs/platform-express';
import { applyJob, applyJobSchema } from './applyjob.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: jobSchems }]),
    MongooseModule.forFeature([
      { name: applyJob.name, schema: applyJobSchema },
    ]),
    MulterModule.register({
      dest: './public/upload',
    }),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
