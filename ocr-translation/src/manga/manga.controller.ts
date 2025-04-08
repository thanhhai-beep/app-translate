import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('manga')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createMangaDto: CreateMangaDto) {
    return this.mangaService.create(createMangaDto);
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(id, updateMangaDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.mangaService.remove(id);
  }
} 