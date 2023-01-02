import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type applyJobDocument = applyJob & Document;

enum activities {
  Selected = 'selected',
  Rejected = 'rejected',
  Hold = 'hold',
}

@Schema()
export class applyJob {
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop()
  intro: string;
  @Prop()
  cv: string;
  @Prop()
  position: string;
  @Prop()
  selected: activities;

  @Prop({ default: false })
  isPreview: boolean;
  @Prop({ default: new Date() })
  createdAt: Date;
}

export const applyJobSchema = SchemaFactory.createForClass(applyJob);
