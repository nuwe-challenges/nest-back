import {
  Controller,
  Post,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { GithubService } from '../services/github.service';
import { UsersService } from '../services/users.service';

@Controller('github')
export class GithubController {
  constructor(
    private githubService: GithubService,
    private userService: UsersService,
  ) {}

  @Post(':username')
  async create(@Param('username') username: string) {
    const userFound = await this.userService.findByUsername(username);
    if (!userFound)
      this.sendException(HttpStatus.NOT_FOUND, 'Document not found');

    // Array of user's repositories
    const githubUserData = await this.githubService.getApiInfo(
      userFound.username,
    );
    if (!githubUserData)
      this.sendException(HttpStatus.NOT_FOUND, 'Username not found in GitHub.');

    const repositoriesURL = githubUserData.data.map((repo) => repo.html_url),
      repositories = repositoriesURL.length,
      url = repositoriesURL[0].owner.html_url;

    const newGithubUser = await this.githubService.create({
      username,
      url,
      repositories,
      repositoriesURL,
    });

    userFound.githubUserId = newGithubUser.id;
    this.userService.update(userFound.id, userFound);

    return newGithubUser
      ? newGithubUser
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
