import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NewsLetter,
  newsLetterDocument,
} from 'src/contactus/newsLetter.schema';
import { nodeMailer } from 'src/global/nodeMailer';
import {
  getQueryRequest,
  paginationHelper,
  sendResponse,
} from 'src/global/response.helper';

import { Blog, blogDocument } from './blog.schema';
import { Categories, categoriesDcoument } from './categories.schema';

@Injectable({})
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<blogDocument>,
    @InjectModel(NewsLetter.name)
    private newsLetterModel: Model<newsLetterDocument>,
    @InjectModel(Categories.name)
    private categoryModel: Model<categoriesDcoument>,
  ) {}
  async addBlog(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const newBlog = new this.blogModel({
        dto,
      });

      await newBlog.save();
      if (dto.isTrue) {
        const newsletter = await this.newsLetterModel.find({});

        newsletter.map((a) => {
          nodeMailer({ email: a.email }, 'article', 'info');
        });
      }
      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'New article has been saved successfully',
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

  async getBlog(@Response() res: any, @Request() req: any) {
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

      if (req.user !== 'admin') {
        selectq = {
          isDeleted: false,
          isTrue: false,
        };
      }
      // eslint-disable-next-line prefer-const
      populate = {
        path: 'categories',
        select: 'name',
      };

      const datas = await getQueryRequest(
        this.blogModel,
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
  async updateBlog(@Response() res: any, @Request() req: any, dto: any) {
    try {
      await this.blogModel.update({
        id: req.query.id,
        $set: {
          dto,
        },
      });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        'Blog has been Updated',
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

  async deleteBlog(@Response() res: any, @Request() req: any) {
    try {
      await this.blogModel.update({
        id: req.query.id,
        $set: { isDeleted: true },
      });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        'Blog has been deleted',
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

  //categories
  async addCategory(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const categories = await this.categoryModel.findOne({
        name: dto.name.toUpperCase(),
      });
      console.log({ categories }, req.user.user.id);
      if (categories) {
        return sendResponse(
          res,
          HttpStatus.BAD_REQUEST,
          false,
          null,
          'Data already exist',
          `${dto.name} already exist`,
          null,
        );
      } else {
        const newcategory = new this.categoryModel({
          name: dto.name.toUpperCase(),
          addedBy: req.user.user.id,
        });
        await newcategory.save();
        if (newcategory) {
          return sendResponse(
            res,
            HttpStatus.CREATED,
            true,
            null,
            null,
            'category added successfully',
            null,
          );
        }
      }
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        error,
        'Internal server error',
        null,
      );
    }
  }

  async getCategories(@Response() res: any, @Request() req: any) {
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
    try {
      const datas = await getQueryRequest(
        this.categoryModel,
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

  async updateCategory(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const categories = await this.categoryModel.find({
        name: dto.name.toUppercase(),
        $ne: { id: req.query.id },
      });
      if (!categories) {
        await this.categoryModel.update({
          id: req.query.id,
          $set: {
            name: dto.name.toUppercase(),
          },
        });
        return sendResponse(
          res,
          HttpStatus.OK,
          true,
          null,
          null,
          'Categories has been Updated',
          null,
        );
      } else {
        return sendResponse(
          res,
          HttpStatus.FOUND,
          false,
          null,
          'categories already exist',
          'categories already exist',
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

  async deleteCategory(@Response() res: any, @Request() req: any) {
    try {
      await this.categoryModel.deleteOne({ id: req.query.id });
      return sendResponse(
        res,
        HttpStatus.OK,
        true,
        null,
        null,
        'Categories has been deleted',
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
}
