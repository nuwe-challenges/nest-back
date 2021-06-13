import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@nest.com>', // override default from
      subject: 'Thanks for using our service!',
      text: 'Notification',
      html: 'Notification',
      // template: 'confirmation', // `.hbs` extension is appended automatically
      // context: {
      //   // ✏️ filling curly brackets with content
      //   name: user.name,
      //   url,
      // },
    });
  }
}
