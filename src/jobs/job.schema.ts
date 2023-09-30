import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blob } from 'buffer';
import { Document } from 'mongoose';

export type jobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
    title: string;

  @Prop()
    stack: string;

  @Prop()
    slug: string;

  @Prop()
    content: Blob;

  @Prop()
    createdAt: Date;

  @Prop()
    updatedAt: Date;

  @Prop({ default: false })
    isPreview: boolean;
}

export const jobSchems = SchemaFactory.createForClass(Job);
