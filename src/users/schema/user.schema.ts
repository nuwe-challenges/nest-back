import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ required: true })
  password: string;

  @Prop()
  gitlabUserId: string;

  @Prop()
  githubUserId: string;

  @Prop()
  countryId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
