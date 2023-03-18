import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { User, userSchema } from 'src/auth/users.schema';

export type categoriesDcoument = Categories & Document;

@Schema()
export class Categories {
  @Prop()
  name: string;

  @Prop({ type: userSchema })
  @Type(() => User)
  addedBy: User;
}

export const categoriesSchema = SchemaFactory.createForClass(Categories);
