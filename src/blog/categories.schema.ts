import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/auth/users.schema';

export type categoriesDcoument = Categories & Document;

@Schema()
export class Categories {
  @Prop({ required: true })
    name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
    addedBy: Types.ObjectId;
}

export const categoriesSchema = SchemaFactory.createForClass(Categories);
