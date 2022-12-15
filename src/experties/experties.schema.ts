import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type expertDocument = Expert & Document;

@Schema()
export class Expert {
  @Prop()
  title: string;
  @Prop()
  items?: [{ name: string }];
}

export const expertSchema = SchemaFactory.createForClass(Expert);
