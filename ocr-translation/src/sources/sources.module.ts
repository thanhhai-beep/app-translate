import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Chapter } from 'src/chapters/chapter.entity';
import { Manga } from 'src/manga/entities';
import { ImageService } from 'src/services/image.service';
import { Category } from 'src/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Source, Manga, Chapter, Category]), HttpModule],
  controllers: [SourcesController],
  providers: [SourcesService, ImageService],
  exports: [SourcesService]
})
export class SourcesModule {} 