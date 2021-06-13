import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/config/local.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UsersModule,
    CountryModule,
    AuthModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
