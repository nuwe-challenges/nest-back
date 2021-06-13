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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
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
}
