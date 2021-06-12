import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { isValidObjectId } from 'mongoose';
import { GithubService } from '../services/github.service';
import { GitlabService } from '../services/gitlab.service';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private githubService: GithubService,
    private gitlabService: GitlabService,
  ) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    this.validateParamId(id);

    const userFound = await this.userService.findOneById(id);
    return userFound
      ? userFound
      : this.sendException(HttpStatus.NOT_FOUND, 'Document not found');
  }

  @Get(':id/github')
  async getGithubUser(@Param('id') id: string) {
    this.validateParamId(id);

    const userFound = await this.userService.findOneById(id);
    if (!userFound)
      this.sendException(HttpStatus.NOT_FOUND, 'Document not found');

    const githubUser = await this.githubService.findOneById(
      userFound.githubUserId,
    );

    return githubUser
      ? githubUser
      : this.sendException(HttpStatus.NOT_FOUND, 'Document not found');
  }

  @Get(':id/gitlab')
  async getGitlabUser(@Param('id') id: string) {
    this.validateParamId(id);

    const userFound = await this.userService.findOneById(id);
    if (!userFound)
      this.sendException(HttpStatus.NOT_FOUND, 'Document not found');

    const gitlabUser = await this.gitlabService.findOneById(
      userFound.gitlabUserId,
    );

    return gitlabUser
      ? gitlabUser
      : this.sendException(HttpStatus.NOT_FOUND, 'Document not found');
  }

  @Post()
  async addOne(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    this.validateParamId(id);

    return this.userService.update(id, payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    this.validateParamId(id);

    const deleted = await this.userService.delete(id);
    return deleted
      ? deleted
      : this.sendException(HttpStatus.NOT_FOUND, 'Document not found.');
  }

  validateParamId(id: string) {
    if (!isValidObjectId(id))
      this.sendException(HttpStatus.BAD_REQUEST, 'Invalid id format.');
  }

  sendException(status: number, error: string) {
    throw new HttpException({ status, error }, status);
  }
}
