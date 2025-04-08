import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { MangaService } from './manga.service';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    private mangaService: MangaService,
  ) {}

  async create(mangaId: string, createChapterDto: CreateChapterDto): Promise<Chapter> {
    const manga = await this.mangaService.findOne(mangaId);
    const chapter = this.chapterRepository.create({
      ...createChapterDto,
      manga,
    });
    return await this.chapterRepository.save(chapter);
  }

  async findAll(mangaId: string): Promise<Chapter[]> {
    return await this.chapterRepository.find({
      where: { manga: { id: mangaId } },
      relations: ['translations'],
    });
  }

  async findOne(mangaId: string, chapterNumber: number): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne({
      where: { manga: { id: mangaId }, chapterNumber },
      relations: ['translations'],
    });
    if (!chapter) {
      throw new NotFoundException(
        `Chapter ${chapterNumber} of manga ${mangaId} not found`,
      );
    }
    return chapter;
  }

  async update(
    mangaId: string,
    chapterNumber: number,
    updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter> {
    const chapter = await this.findOne(mangaId, chapterNumber);
    Object.assign(chapter, updateChapterDto);
    return await this.chapterRepository.save(chapter);
  }

  async remove(mangaId: string, chapterNumber: number): Promise<void> {
    const chapter = await this.findOne(mangaId, chapterNumber);
    await this.chapterRepository.remove(chapter);
  }
} 