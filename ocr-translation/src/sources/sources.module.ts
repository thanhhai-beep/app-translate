import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Chapter } from 'src/chapters/chapter.entity';
import { Manga } from 'src/manga/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Source, Manga, Chapter]), HttpModule],
  controllers: [SourcesController],
  providers: [SourcesService],
  exports: [SourcesService]
})
export class SourcesModule {} 