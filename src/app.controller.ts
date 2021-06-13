import { Param } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LocalAuthGuard } from './auth/guards/local.guard';
import { AuthService } from './auth/services/auth.service';
import { MailingService } from './mailing/services/mailing.service';
import { UsersService } from './users/services/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly mailingService: MailingService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @HttpCode(200)
  async register(@Request() req: any) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Request() req: any) {
    return req.user;
  }

  @Get('notification/:id')
  async sendNotification(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    await this.mailingService.sendUserConfirmation(user);

    return 'Sent notification';
  }
}
