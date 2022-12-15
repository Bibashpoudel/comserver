import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blob } from 'buffer';
import { Document } from 'mongoose';

export type termsDocument = Terms & Document;

@Schema()
export class Terms {
  @Prop()
  termsData: Blob;
}

export const termsSchema = SchemaFactory.createForClass(Terms);
