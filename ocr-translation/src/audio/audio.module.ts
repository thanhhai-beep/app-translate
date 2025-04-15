import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';

@Module({
  imports: [HttpModule],
  controllers: [AudioController],
  providers: [AudioService],
  exports: [AudioService],
})
export class AudioModule {}
