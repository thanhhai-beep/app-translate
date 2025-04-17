import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Manga } from 'src/manga/entities';
import { ImageService } from 'src/services/image.service';
import { Category } from 'src/categories/category.entity';
import { Chapter } from '@/chapters/entities/chapter.entity';
import { ImportMangaQueue } from './queues/import-manga.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'import-manga',
    }),
    TypeOrmModule.forFeature([Source, Manga, Chapter, Category]),
    HttpModule
  ],
  controllers: [SourcesController],
  providers: [SourcesService, ImageService, ImportMangaQueue],
  exports: [SourcesService]
})
export class SourcesModule {} 