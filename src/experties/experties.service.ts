import { Injectable, Request, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expert, expertDocument } from './experties.schema';

@Injectable({})
export class ExpertiesService {
  constructor(
    @InjectModel(Expert.name) private expertModel: Model<expertDocument>,
  ) {}

  async addExpert(@Response() res: any, @Request() req: any, dto: any) {
    console.log(dto);
    try {
      const newExpert = new this.expertModel({
        title: dto.title,
        items: dto.items,
      });
      await newExpert.save();
    } catch (error) {
      console.log(error);
    }
  }
}
