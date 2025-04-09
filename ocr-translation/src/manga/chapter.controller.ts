import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('manga/:mangaId/chapters')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(
    @Param('mangaId') mangaId: string,
    @Body() createChapterDto: CreateChapterDto,
  ) {
    return this.chapterService.create(mangaId, createChapterDto);
  }

  @Get()
  findAll(@Param('mangaId') mangaId: string) {
    return this.chapterService.findAllByManga(mangaId);
  }

  @Get(':chapterNumber')
  findOne(
    @Param('mangaId') mangaId: string,
    @Param('chapterNumber') chapterNumber: number,
  ) {
    return this.chapterService.findOne(mangaId, chapterNumber);
  }

  @Patch(':chapterNumber')
  @Roles(Role.ADMIN)
  update(
    @Param('mangaId') mangaId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chapterService.update(mangaId, updateChapterDto);
  }

  @Delete(':chapterNumber')
  @Roles(Role.ADMIN)
  remove(
    @Param('mangaId') mangaId: string
  ) {
    return this.chapterService.remove(mangaId);
  }
} 