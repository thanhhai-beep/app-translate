import { Controller, Get, Post, Body, Param, Delete, UseGuards, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(id);
  }

  @Get('manga/:mangaId')
  findByMangaId(@Param('mangaId') mangaId: string) {
    return this.audioService.findByMangaId(mangaId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.audioService.remove(id);
  }

  @Get(':id/download')
  async downloadAudio(@Param('id') id: string, @Res() res: Response) {
    const audio = await this.audioService.findOne(id);
    if (audio.status !== 'completed') {
      return res.status(400).json({ message: 'Audio is not ready for download' });
    }
    const fileStream = await this.audioService.getAudioFile(audio);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${audio.title}.mp3"`);
    fileStream.pipe(res);
  }

  @Post(':id/regenerate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  regenerateAudio(@Param('id') id: string) {
    return this.audioService.regenerate(id);
  }
} 