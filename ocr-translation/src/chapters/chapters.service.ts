import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Manga } from '../manga/entities/manga.entity';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const manga = await this.mangaRepository.findOne({ where: { id: createChapterDto.mangaId } });
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    const chapter = new Chapter();
    Object.assign(chapter, createChapterDto);
    chapter.manga = manga;

    return this.chapterRepository.save(chapter);
  }

  async findAll(mangaId: string, page: number = 1, pageSize: number = 10) {
    const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
    if (!manga) {
      throw new BadRequestException(`Manga with ID ${mangaId} not found`);
    }

    const [data, total] = await this.chapterRepository.findAndCount({
      where: { mangaId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { chapterNumber: 'ASC' },
    });
    return { data, total };
  }

  async findOne(mangaId: string, id: string) {
    const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
    if (!manga) {
      throw new BadRequestException(`Manga with ID ${mangaId} not found`);
    }

    const chapter = await this.chapterRepository.findOne({
      where: { id, mangaId },
    });
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
    if (chapter.contentType === 'IMAGE') {
      chapter.content = (process.env.DOMAIN || 'http://localhost:3000') + chapter.content;
    }
    return chapter;
  }

  async update(mangaId: string, id: string, updateChapterDto: UpdateChapterDto) {
    const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
    if (!manga) {
      throw new BadRequestException(`Manga with ID ${mangaId} not found`);
    }

    const chapter = await this.findOne(mangaId, id);
    Object.assign(chapter, updateChapterDto);
    return await this.chapterRepository.save(chapter);
  }

  async remove(mangaId: string, id: string) {
    const manga = await this.mangaRepository.findOne({ where: { id: mangaId } });
    if (!manga) {
      throw new BadRequestException(`Manga with ID ${mangaId} not found`);
    }

    const chapter = await this.findOne(mangaId, id);
    return await this.chapterRepository.remove(chapter);
  }
} 