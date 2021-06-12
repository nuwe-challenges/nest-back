import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GitlabUser, GitlabUserDocument } from '../schema/gitlab.schema';
import { CreateSocialUser } from '../dto/socialUser.dto';
import { AxiosResponse } from 'axios';
import to from 'await-to-js';

@Injectable()
export class GitlabService {
  constructor(
    @InjectModel(GitlabUser.name)
    private gitlabModel: Model<GitlabUserDocument>,
    private httpService: HttpService,
  ) {}

  async getApiInfo(username: string): Promise<AxiosResponse<any> | null> {
    const [error, apiCall] = await to(
      this.httpService
        .get(`https://gitlab.com/api/v4/users/${username}/projects`)
        .toPromise(),
    );

    return error ? null : apiCall;
  }

  async findOneById(id: string): Promise<GitlabUser> {
    return this.gitlabModel.findById(id).exec();
  }

  async create(createSocialUser: CreateSocialUser) {
    const createdSocialUser = new this.gitlabModel(createSocialUser);
    return createdSocialUser.save();
  }
}
