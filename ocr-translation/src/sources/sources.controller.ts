import { Controller, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ImportMangaListDto } from './dto/import-manga-list.dto';
import { MangaInfo } from './entities/manga-info.entity';
import { Manga } from '../manga/entities/manga.entity';

@Controller('sources')
@UseGuards(JwtAuthGuard)
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Post('import-list')
  async importMangaList(
    @Body() importMangaListDto: ImportMangaListDto,
  ): Promise<MangaInfo[]> {
    return this.sourcesService.importMangaList(
      importMangaListDto.url,
      importMangaListDto.sourceType,
    );
  }

  @Post('save-manga-list')
  async saveMangaList(@Body() mangaList: MangaInfo[]): Promise<Manga[]> {
    return this.sourcesService.saveMangaList(mangaList);
  }

  @Post('save-manga-with-images')
  async saveMangaWithImages(@Body() mangaInfo: MangaInfo): Promise<Manga> {
    return this.sourcesService.saveMangaWithImages(mangaInfo);
  }
} 