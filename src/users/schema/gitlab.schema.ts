import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GitlabUserDocument = GitlabUser & Document;

@Schema()
export class GitlabUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  repositories: string;

  @Prop({ required: true })
  repositoriesURL: string;
}

export const GitlabUserSchema = SchemaFactory.createForClass(GitlabUser);
