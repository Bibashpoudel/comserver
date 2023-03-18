import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { User, userSchema } from 'src/auth/users.schema';
import { Categories, categoriesSchema } from './categories.schema';

export type blogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;
  @Prop()
  image: string;
  @Prop({ type: userSchema })
  @Type(() => User)
  addedBy: User;
  @Prop()
  content: BinaryData;

  @Prop()
  tag: Array<string>;

  @Prop({ type: categoriesSchema })
  @Type(() => Categories)
  categorie: Categories;

  isTrue?: boolean = false;
}

export const blogSchema = SchemaFactory.createForClass(Blog);
