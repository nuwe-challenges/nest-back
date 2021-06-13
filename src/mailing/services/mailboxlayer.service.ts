import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import to from 'await-to-js';

@Injectable()
export class MailboxlayerService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private readonly API_KEY = this.configService.get<string>('MAILBOXLAYER_KEY');
  async validateEmail(email: string) {
    const [error, responseAPI] = await to(
      this.httpService
        .get(
          `http://apilayer.net/api/check?access_key=${this.API_KEY}&email=${email}`,
        )
        .toPromise(),
    );
    if (error) return false;

    const isEmailValid =
      responseAPI.data.format_valid && responseAPI.data.smtp_check
        ? true
        : false;

    return isEmailValid ? false : true;
  }
}
