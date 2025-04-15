import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('process')
  async processImage(@Body() body: { url: string }) {
    if (!body.url) {
      throw new BadRequestException('URL is required');
    }

    try {
      const result = await this.translationService.processImage(body.url);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
