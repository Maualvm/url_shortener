import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener/url-shortener.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { EncodeUrlDto } from './url-shortener/dto/encode-url.dto';
import { DecodeUrlDto } from './url-shortener/dto/decode-url.dto';

@Controller()
export class AppController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('encode')
  async encodeUrl(@Request() req, @Body() payload: EncodeUrlDto) {
    const userId = req.user.sub;
    const shortCode = await this.urlShortenerService.encodeUrl(
      userId,
      payload.url,
    );
    return { shortCode };
  }

  @UseGuards(JwtAuthGuard)
  @Post('decode')
  async decodeUrl(@Request() req, @Body() payload: DecodeUrlDto) {
    const userId = req.user.sub;
    const originalUrl = await this.urlShortenerService.decodeUrl(
      userId,
      payload.shortCode,
    );
    return { originalUrl };
  }
}
