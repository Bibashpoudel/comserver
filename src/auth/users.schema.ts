import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document;

enum Role {
  User = 'user', // or User = "user",
  Admin = 'admin', // or Admin = "admin",
}

@Schema()
export class User {
  @Prop()
    fullName: string;

  @Prop({ required: true, unique: true })
    email: string;

  @Prop()
    password: string;

  @Prop()
    role: Role;
}

export const userSchema = SchemaFactory.createForClass(User);
