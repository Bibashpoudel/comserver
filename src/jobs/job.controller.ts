import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { addJobs, applyJob, updateJobs } from './dto';
import { JobService } from './job.service';
import { diskStorage } from 'multer';
import path from 'path';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @UseGuards(AuthGuard('jwt'))
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
    return this.jobService.getJobs(res, req);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/admin/get-jobs')
  async getadminJobs(@Response() res: any, @Request() req: any): Promise<any> {
    return this.jobService.getadminJobs(res, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/admin/delete/:id')
  async deteteJob(
    @Response() res: any,
    @Request() req: any,
    @Param('id') id: any,
  ): Promise<any> {
    return this.jobService.deteteJob(res, req, id);
  }

  @Get('admin/get-job/:id')
  async getAdminJobDetails(
    @Response() res: any,
    @Request() req: any,
    @Query('id') id: any,
  ): Promise<any> {
    return this.jobService.getAdminJobDetails(res, req, id);
  }

  @Get('/get-job/:slug')
  async getJob(@Response() res: any, @Request() req: any): Promise<any> {
    return this.jobService.getJob(res, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  async updateJobs(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: updateJobs,
  ): Promise<any> {
    console.log('dto', dto);
    return this.jobService.updateJobs(res, req, dto);
  }

  // for client sode
  @Post('apply/jobs')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './public/resume',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: applyJob,
    @UploadedFile()
    file,
  ): Promise<any> {
    const cv: any = req.files[0].filename;
    console.log('file', req.files);
    return this.jobService.applyJobs(res, req, dto, cv);
  }

  @Get('apply/get-jobs')
  async getApplyjobs(@Response() res: any, @Request() req: any) {
    return this.jobService.getApplyJobs(res, req);
  }
}
