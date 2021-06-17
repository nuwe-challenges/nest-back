import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class SerializerService extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: any, done: CallableFunction) {
    console.log(userId);

    return this.userService
      .findOneById(userId)
      .then((user) => done(null, user))
      .catch((error) => done(error));
    // done(null, payload);
  }
}
