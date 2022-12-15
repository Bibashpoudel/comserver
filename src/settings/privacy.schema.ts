import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blob } from 'buffer';
import { Document } from 'mongoose';

export type privacyDocument = Privacy & Document;

@Schema()
export class Privacy {
  @Prop()
  privacyData: Blob;
}

export const privacySchema = SchemaFactory.createForClass(Privacy);
