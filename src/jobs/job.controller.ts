import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { addJobs } from './dto';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('/add-job')
  async addJobs(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: addJobs,
  ): Promise<any> {
    console.log('dto', dto);
    return this.jobService.addJob(res, req, dto);
  }

  @Get('/get-jobs')
  async getJobs(@Response() res: any, @Request() req: any): Promise<any> {
    console.log('dto');
    return this.jobService.getJobs(res, req);
  }
}
