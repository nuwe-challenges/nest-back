import { Controller } from '@nestjs/common';
import { MailboxlayerService } from '../services/mailboxlayer.service';

@Controller()
export class MailingController {
  constructor(private mailboxlayerService: MailboxlayerService) {}
}
