import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ default: false })
    isReply: boolean;
}

export const contactusSchema = SchemaFactory.createForClass(Contactus);
