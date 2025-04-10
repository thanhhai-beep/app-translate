import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('manga')
@ApiBearerAuth()
@Controller('manga')
@UseGuards(JwtAuthGuard)
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  @ApiOperation({ summary: 'Create new manga' })
  @ApiResponse({ status: 201, description: 'Manga created successfully' })
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all manga with pagination' })
  @ApiResponse({ status: 200, description: 'Return all manga' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.mangaService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get manga by id' })
  @ApiResponse({ status: 200, description: 'Return manga by id' })
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update manga' })
  @ApiResponse({ status: 200, description: 'Manga updated successfully' })
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(id, updateMangaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete manga' })
  @ApiResponse({ status: 200, description: 'Manga deleted successfully' })
  remove(@Param('id') id: string) {
    return this.mangaService.remove(id);
  }
} 