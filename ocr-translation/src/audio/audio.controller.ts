import { Controller, Get, Query } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('generate')
  async generateAudio(@Query('text') text: string) {
    console.log(text);
    
    const filePath = await this.audioService.textToAudio(text);
    return { message: 'Audio created', path: filePath };
  }
}
