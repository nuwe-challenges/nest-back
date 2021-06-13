import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailingModule } from '../mailing/mailing.module';

import { UserSchema, User, UserDocument } from './schema/user.schema';
import { GithubUserSchema, GithubUser } from './schema/github.schema';
import { GitlabUserSchema, GitlabUser } from './schema/gitlab.schema';

import { UsersController } from './controllers/users.controller';
import { GithubController } from './controllers/github.controller';
import { GitlabController } from './controllers/gitlab.controller';

import { UsersService } from './services/users.service';
import { GithubService } from './services/github.service';
import { GitlabService } from './services/gitlab.service';

import { encrypt } from './utils/bcrypt';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', async function () {
            this.password = await encrypt(this.password);
          });

          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: GithubUser.name, schema: GithubUserSchema },
    ]),
    MongooseModule.forFeature([
      { name: GitlabUser.name, schema: GitlabUserSchema },
    ]),
    MailingModule,
  ],
  controllers: [UsersController, GithubController, GitlabController],
  providers: [UsersService, GithubService, GitlabService],
  exports: [UsersService],
})
export class UsersModule {}
