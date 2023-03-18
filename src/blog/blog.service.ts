import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NewsLetter,
  newsLetterDocument,
} from 'src/contactus/newsLetter.schema';
import { nodeMailer } from 'src/global/nodeMailer';
import { sendResponse } from 'src/global/response.helper';
import { blog } from './blog.interface';
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
  async addBlog(@Response() res: any, @Request() req: any, dto: blog) {
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

  async addCategories(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const categories = await this.categoryModel.findOne({
        name: dto.name,
      });
      if (categories) {
      } else {
        const newcategires = new this.categoryModel({
          dto,
        });
      }
    } catch (error) {}
  }
}
