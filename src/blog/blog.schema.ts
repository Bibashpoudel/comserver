import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type blogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;
  @Prop()
  image: string;
  @Prop()
  addedBy: string;
  @Prop()
  content: BinaryData;
}

export const blogSchema = SchemaFactory.createForClass(Blog);
