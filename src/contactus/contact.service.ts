import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nodeMailer } from 'src/global/nodeMailer';
import {
  getQueryRequest,
  paginationHelper,
  sendResponse,
} from 'src/global/response.helper';
import { Contactus, contactUsDocument } from './contactus.schema';
import { NewsLetter, newsLetterDocument } from './newsLetter.schema';

@Injectable({})
export class ContactService {
  constructor(
    @InjectModel(Contactus.name)
    private contactUsModel: Model<contactUsDocument>,
    @InjectModel(NewsLetter.name)
    private newsLetterModel: Model<newsLetterDocument>,
  ) {}

  async addContactUs(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const contactus = new this.contactUsModel({
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
      });
      await contactus.save();
      nodeMailer(
        { email: contactus.email, fullName: contactus.fullName },
        'contactUs',
        'info',
      );
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'You message is save successfully',
        null,
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

  async getContactUS(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any;
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

      const datas = await getQueryRequest(
        this.contactUsModel,
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
  async addNewsLetter(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const oldNewsLetter = await this.newsLetterModel.findOne({
        email: dto.email.trim().toLowerCase(),
      });
      if (!oldNewsLetter) {
        const newsLetter = new this.newsLetterModel({
          email: dto.email.trim().toLowerCase(),
          idTrue: true,
        });
        await newsLetter.save();
        nodeMailer({ email: newsLetter.email }, 'newsLetter', 'info');
      }
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'You email is save successfully',
        null,
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
  async getNewsLetter(@Response() res: any, @Request() req: any) {
    try {
      const defaultSize: any = 10;
      let searchq: any;
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

      const datas = await getQueryRequest(
        this.newsLetterModel,
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
}
