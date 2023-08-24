import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async addShortUrl(
    userId: string,
    shortUrl: string,
    originalUrl: string,
  ): Promise<void> {
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (user) {
      user.shortUrls.push({ shortUrl, originalUrl });
      await user.save();
    }
  }

  async getOriginalUrl(
    userId: string,
    shortUrl: string,
  ): Promise<string | undefined> {
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (user) {
      const foundUrl = user.shortUrls.find((url) => url.shortUrl === shortUrl);
      if (foundUrl) {
        return foundUrl.originalUrl;
      }
    }
    return undefined;
  }
}
