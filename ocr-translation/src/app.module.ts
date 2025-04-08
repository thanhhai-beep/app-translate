import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OcrModule } from './ocr/ocr.module';
import { TranslationModule } from './translation/translation.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, OcrModule, TranslationModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
