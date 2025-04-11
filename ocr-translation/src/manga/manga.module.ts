import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { Manga } from './entities/manga.entity';
import { Category } from '../categories/category.entity';
import { ChaptersModule } from '../chapters/chapters.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, Category]), ChaptersModule, CategoriesModule],
  controllers: [MangaController],
  providers: [MangaService],
  exports: [MangaService],
})
export class MangaModule {} 