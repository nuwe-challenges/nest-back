import { Module, HttpModule } from '@nestjs/common';
import { MailingController } from './controllers/mailing.controller';
import { MailboxlayerService } from './services/mailboxlayer.service';

@Module({
  imports: [HttpModule],
  controllers: [MailingController],
  providers: [MailboxlayerService],
  exports: [MailboxlayerService],
})
export class MailingModule {}
