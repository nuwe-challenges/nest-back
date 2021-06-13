import { Test, TestingModule } from '@nestjs/testing';
import { MailboxlayerService } from './mailboxlayer.service';

describe('MailboxlayerService', () => {
  let service: MailboxlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailboxlayerService],
    }).compile();

    service = module.get<MailboxlayerService>(MailboxlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
