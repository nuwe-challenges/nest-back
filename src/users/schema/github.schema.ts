import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GithubUserDocument = GithubUser & Document;

@Schema()
export class GithubUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  repositories: string;

  @Prop({ required: true })
  repositoriesURL: string;
}

export const GithubUserSchema = SchemaFactory.createForClass(GithubUser);
