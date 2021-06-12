import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GithubUser, GithubUserDocument } from '../schema/github.schema';
import { CreateSocialUser } from '../dto/socialUser.dto';
import { AxiosResponse } from 'axios';
import to from 'await-to-js';

@Injectable()
export class GithubService {
  constructor(
    @InjectModel(GithubUser.name)
    private githubModel: Model<GithubUserDocument>,
    private httpService: HttpService,
  ) {}

  async getApiInfo(username: string): Promise<AxiosResponse<any> | null> {
    const [error, apiCall] = await to(
      this.httpService
        .get(`https://api.github.com/users/${username}/repos`)
        .toPromise(),
    );

    return error ? null : apiCall;
  }

  async findOneById(id: string): Promise<GithubUser> {
    return this.githubModel.findById(id).exec();
  }

  async create(createSocialUser: CreateSocialUser) {
    const createdSocialUser = new this.githubModel(createSocialUser);
    return createdSocialUser.save();
  }
}
