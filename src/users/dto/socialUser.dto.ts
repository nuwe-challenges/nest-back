import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSocialUser {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly url: string;

  readonly repositories: number;

  readonly repositoriesURL: [string];
}
