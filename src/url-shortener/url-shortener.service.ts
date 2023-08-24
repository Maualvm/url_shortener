import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlShortenerService {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private readonly userService: UserService) {}

  async encodeUrl(userId: string, originalUrl: string): Promise<string> {
    const shortCode = nanoid(8);
    const shortUrl = `${this.baseUrl}/${shortCode}`;

    // Save the short URL and original URL in the user's data
    await this.userService.addShortUrl(userId, shortUrl, originalUrl);
    return shortUrl;
  }

  async decodeUrl(userId: string, shortUrl: string): Promise<string> {
    const originalUrl = await this.userService.getOriginalUrl(userId, shortUrl);
    return originalUrl;
  }
}
