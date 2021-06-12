import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema, User } from './schema/user.schema';
import { GithubUserSchema, GithubUser } from './schema/github.schema';
import { GitlabUserSchema, GitlabUser } from './schema/gitlab.schema';

import { UsersController } from './controllers/users.controller';
import { GithubController } from './controllers/github.controller';
import { GitlabController } from './controllers/gitlab.controller';

import { UsersService } from './services/users.service';
import { GithubService } from './services/github.service';
import { GitlabService } from './services/gitlab.service';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: GithubUser.name, schema: GithubUserSchema },
    ]),
    MongooseModule.forFeature([
      { name: GitlabUser.name, schema: GitlabUserSchema },
    ]),
  ],
  controllers: [UsersController, GithubController, GitlabController],
  providers: [UsersService, GithubService, GitlabService],
})
export class UsersModule {}
