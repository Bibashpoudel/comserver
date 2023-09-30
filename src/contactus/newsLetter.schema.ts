import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type newsLetterDocument = NewsLetter & Document;

@Schema()
export class NewsLetter {
  @Prop()
    email: string;

  @Prop()
    isTure: boolean;
}

export const newsLetterSchema = SchemaFactory.createForClass(NewsLetter);
