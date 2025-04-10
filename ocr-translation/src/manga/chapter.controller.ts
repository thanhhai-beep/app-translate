import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('chapter')
@ApiBearerAuth()
@Controller('chapter')
@UseGuards(JwtAuthGuard)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiOperation({ summary: 'Create new chapter' })
  @ApiResponse({ status: 201, description: 'Chapter created successfully' })
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto as any);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chapters with pagination' })
  @ApiResponse({ status: 200, description: 'Return all chapters' })
  findAll(
    @Query('mangaId') mangaId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.chapterService.findAll(mangaId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chapter by id' })
  @ApiResponse({ status: 200, description: 'Return chapter by id' })
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chapter' })
  @ApiResponse({ status: 200, description: 'Chapter updated successfully' })
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chapter' })
  @ApiResponse({ status: 200, description: 'Chapter deleted successfully' })
  remove(@Param('id') id: string) {
    return this.chapterService.remove(id);
  }
} 