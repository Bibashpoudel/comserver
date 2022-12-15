import {
  HttpStatus,
  Inject,
  Injectable,
  Request,
  Response,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendResponse } from 'src/global/response.helper';
import { Privacy, privacyDocument } from './privacy.schema';
import { Terms, termsDocument } from './terms.schema';
import { getQueryRequest, paginationHelper } from '../global/response.helper';
import { gMessage } from 'src/global/global.config';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Privacy.name) private privacyModel: Model<privacyDocument>,
    @InjectModel(Terms.name) private termsModel: Model<termsDocument>,
  ) {}

  async addPrivacy(@Response() res: any, @Request() req: any, dto: any) {
    try {
      console.log(dto);
      console.log(req.params.id);
      if (req.params.id) {
        await this.privacyModel.updateOne(
          { _id: req.params.id },
          { $set: { privacyData: dto.privacyData } },
        );
      } else {
        const newprivacy = new this.privacyModel({
          privacyData: dto.privacyData,
        });

        await newprivacy.save();
      }
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'Privacy has been saved successfully',
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

  async addTerms(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const newterms = new this.termsModel({
        termsData: dto.terms,
      });
      await newterms.save();
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'Terms & conditions has been saved successfully',
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

  async getPrivacy(@Response() res: any, @Request() req: any) {
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
        this.privacyModel,
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
        gMessage.dataObtain,
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
