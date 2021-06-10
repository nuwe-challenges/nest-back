import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/cats/cats.controller';
import { SampleController } from './controllers/sample/sample.controller';
import { SampleService } from './services/sample/sample.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, CatsController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
