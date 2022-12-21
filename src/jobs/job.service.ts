import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  getQueryRequest,
  paginationHelper,
  sendResponse,
} from 'src/global/response.helper';
import { Job, jobDocument } from './job.schema';

@Injectable({})
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<jobDocument>) {}

  async addJob(@Response() res: any, @Request() req: any, dto: any) {
    try {
      console.log(dto);
      const newJobs = new this.jobModel({
        title: dto.title,
        stack: dto.stack,
        slug: dto.slug,
        content: dto.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPreview: dto.isPreview,
      });
      await newJobs.save();
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'New Job is save successfully',
        null,
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        error,
        'Internal server error bibahs',
        null,
      );
    }
  }

  async getJobs(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any = { isPreview: true };
      let selectq: any;
      let sortq: any;
      let page: any;
      let size: any;
      let populate: any;
      let populate1: any;
      if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
        page = Math.abs(req.query.page);
      } else {
        page = 1;
      }
      if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
        size = Math.abs(req.query.size);
      } else {
        size = defaultSize;
      }
      searchq = {
        isPreview: true,
      };
      const datas = await getQueryRequest(
        this.jobModel,
        searchq,
        selectq,
        sortq,
        page,
        size,
        populate,
        populate1,
      );
      return paginationHelper(
        res,
        HttpStatus.OK,
        true,
        datas.data,
        'Data Obtain successfully',
        page,
        size,
        datas.totalData,
      );
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        'Internal server error',
        'Internal server error',
        null,
      );
    }
  }

  async getJob(@Response() res: any, @Request() req: any) {
    try {
      const id = req.params.id;
      const job = await this.jobModel.findOne({ _id: id });
      if (job) {
        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          job,
          null,
          'Data Obtain successfully',
          null,
        );
      }
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        'Internal server error',
        'Internal server error',
        null,
      );
    }
  }

  async updateJobs(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const id = req.params.id;
      const job = await this.jobModel.findOne({ _id: id });
      if (job) {
        job.content = dto.content;
        job.isPreview = dto.isPreview;
        job.updatedAt = dto.updatedAt;
        await job.save();
        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          null,
          null,
          'Job has been save successfully',
          null,
        );
      }
    } catch (error) {
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        'Internal server error',
        'Internal server error',
        null,
      );
    }
  }
}
