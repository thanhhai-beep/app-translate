import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { Manga } from './entities/manga.entity';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manga]), ChaptersModule],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {} 