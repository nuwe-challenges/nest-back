import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { GitlabService } from '../services/gitlab.service';
import { UsersService } from '../services/users.service';

@Controller('gitlab')
export class GitlabController {
  constructor(
    private gitlabService: GitlabService,
    private userService: UsersService,
  ) {}

  @Post(':username')
  async create(@Param('username') username: string) {
    const userFound = await this.userService.findByUsername(username);
    if (!userFound)
      this.sendException(HttpStatus.NOT_FOUND, 'Document not found');

    // Array of user's repositories
    const gitlabUserData = await this.gitlabService.getApiInfo(
      userFound.username,
    );
    if (!gitlabUserData)
      this.sendException(HttpStatus.NOT_FOUND, 'Username not found in GitLab.');

    const repositoriesURL = gitlabUserData.data.map(
        (project) => project.web_url,
      ),
      repositories = repositoriesURL.length,
      url = repositoriesURL[0].owner.web_url;

    const newGitlabUser = await this.gitlabService.create({
      username,
      url,
      repositories,
      repositoriesURL,
    });

    userFound.gitlabUserId = newGitlabUser.id;
    this.userService.update(userFound.id, userFound);

    return newGitlabUser
      ? newGitlabUser
      : this.sendException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error in request processing',
        );
  }

  validateParamId(id: string) {
    if (!isValidObjectId(id))
      this.sendException(HttpStatus.BAD_REQUEST, 'Invalid id format.');
  }

  sendException(status: number, error: string) {
    throw new HttpException({ status, error }, status);
  }
}
