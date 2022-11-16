import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type contactUsDocument = Contactus & Document;

@Schema()
export class Contactus {
  @Prop()
  email: string;
  @Prop()
  fullName: string;
  @Prop()
  phone?: string;
  @Prop()
  message: string;
}

export const contactusSchema = SchemaFactory.createForClass(Contactus);
