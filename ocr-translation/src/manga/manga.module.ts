import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaService } from './manga.service';
import { MangaController } from './manga.controller';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { Manga } from './entities/manga.entity';
import { Chapter } from './entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, Chapter])],
  controllers: [MangaController, ChapterController],
  providers: [MangaService, ChapterService],
  exports: [MangaService, ChapterService],
})
export class MangaModule {} 