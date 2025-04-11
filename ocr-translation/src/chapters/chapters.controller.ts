import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChaptersService } from './chapters.service';

@Controller('manga/:mangaId/chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(
    @Param('mangaId') mangaId: string,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    try {
      return this.chaptersService.create(createChapterDto);
    } catch (error) {
      console.error('Error creating chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll(
    @Param('mangaId') mangaId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    try {
      return this.chaptersService.findAll(mangaId, page, pageSize);
    } catch (error) {
      console.error('Error finding chapters:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('mangaId') mangaId: string, @Param('id') id: string) {
    try {
      return this.chaptersService.findOne(mangaId, id);
    } catch (error) {
      console.error('Error finding chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  update(
    @Param('mangaId') mangaId: string,
    @Param('id') id: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    try {
      return this.chaptersService.update(mangaId, id, updateChapterDto);
    } catch (error) {
      console.error('Error updating chapter:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('mangaId') mangaId: string, @Param('id') id: string) {
    try {
      return this.chaptersService.remove(mangaId, id);
    } catch (error) {
      console.error('Error deleting chapter:', error);
      throw new BadRequestException(error.message);
    }
  }
} 