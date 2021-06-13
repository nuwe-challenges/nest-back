import { Module, HttpModule } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailingController } from './controllers/mailing.controller';
import { MailboxlayerService } from './services/mailboxlayer.service';
import { join } from 'path';
import { MailingService } from './services/mailing.service';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: process.env.MAILER_AUTH,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    HttpModule,
  ],
  controllers: [MailingController],
  providers: [MailboxlayerService, MailingService],
  exports: [MailboxlayerService, MailingService],
})
export class MailingModule {}
