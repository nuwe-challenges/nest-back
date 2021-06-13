import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { encrypt } from '../utils/bcrypt';
import { MailboxlayerService } from '../../mailing/services/mailboxlayer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailboxlayerService: MailboxlayerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailApiValid = await this.mailboxlayerService.validateEmail(
      createUserDto.email,
    );
    if (!isEmailApiValid) return null;

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, payload: UpdateUserDto) {
    const isEmailApiValid = await this.mailboxlayerService.validateEmail(
      payload.email,
    );
    if (!isEmailApiValid) return null;

    if (payload.password) payload.password = await encrypt(payload.password);
    return this.userModel
      .findByIdAndUpdate(id, payload, { new: true, useFindAndModify: false })
      .exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
