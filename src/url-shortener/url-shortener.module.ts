import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
  providers: [UrlShortenerService],
  exports: [UrlShortenerService],
})
export class UrlShortenerModule {}
