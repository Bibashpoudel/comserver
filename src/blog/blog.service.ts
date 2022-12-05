import { HttpStatus, Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NewsLetter,
  newsLetterDocument,
} from 'src/contactus/newsLetter.schema';
import { nodeMailer } from 'src/global/nodeMailer';
import { sendResponse } from 'src/global/response.helper';
import { Blog, blogDocument } from './blog.schema';

@Injectable({})
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<blogDocument>,
    @InjectModel(NewsLetter.name)
    private newsLetterModel: Model<newsLetterDocument>,
  ) {}
  async addBlog(@Response() res: any, @Request() req: any, dto: any) {
    try {
      const newBlog = new this.blogModel({
        title: dto.title,
        image: dto.image,
        addedBy: dto.addedBy,
        content: dto.content,
      });

      await newBlog.save();
      if (dto.isTrue) {
        const newsletter = await this.newsLetterModel.find({});

        newsletter.map((a) => {
          nodeMailer({ email: a.email }, 'article');
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
}
