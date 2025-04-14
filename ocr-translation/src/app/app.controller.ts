import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('manga')
  async getMangaList(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('category') category?: string,
  ) {
    return this.appService.getMangaList(page, pageSize, category);
  }

  @Get('manga/:id')
  async getMangaDetail(@Param('id') id: string) {
    return this.appService.getMangaDetail(id);
  }

  @Get('manga/:id/chapters')
  async getChapterList(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.appService.getChapterList(id, page, pageSize);
  }

  @Get('manga/:id/chapters/:chapterId')
  async getChapterDetail(
    @Param('id') id: string,
    @Param('chapterId') chapterId: string,
  ) {
    return this.appService.getChapterDetail(id, chapterId);
  }

  @Get('categories')
  async getCategories() {
    return this.appService.getCategories();
  }
} 