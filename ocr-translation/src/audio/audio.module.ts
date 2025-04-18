import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { Audio } from './entities/audio.entity';
import { Chapter } from '@/chapters/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audio, Chapter])],
  controllers: [AudioController],
  providers: [AudioService],
  exports: [AudioService],
})
export class AudioModule {} 