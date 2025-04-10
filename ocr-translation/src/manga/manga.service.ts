import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
  ) {}

  async create(createMangaDto: CreateMangaDto): Promise<Manga> {
    const mangaData = {
      ...createMangaDto,
      genres: createMangaDto.genres?.join(','),
      targetLanguages: createMangaDto.targetLanguages?.join(','),
      tags: createMangaDto.tags?.join(',')
    };
    const manga = this.mangaRepository.create(mangaData);
    return this.mangaRepository.save(manga);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Manga[]; total: number }> {
    const [data, total] = await this.mangaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne({ where: { id } });
    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    return manga;
  }

  async update(id: string, updateMangaDto: UpdateMangaDto): Promise<Manga> {
    const manga = await this.findOne(id);
    Object.assign(manga, updateMangaDto);
    return this.mangaRepository.save(manga);
  }

  async remove(id: string): Promise<void> {
    const result = await this.mangaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
  }
} 