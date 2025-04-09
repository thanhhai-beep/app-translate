import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto, UpdateMangaDto } from './dto/create-manga.dto';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
  ) {}

  async create(createMangaDto: CreateMangaDto): Promise<Manga> {
    const mangaData: Partial<Manga> = {
      title: createMangaDto.title,
      originalTitle: createMangaDto.originalTitle,
      description: createMangaDto.description,
      author: createMangaDto.author,
      artist: createMangaDto.artist,
      publisher: createMangaDto.publisher,
      status: createMangaDto.status,
      genres: createMangaDto.genres ? JSON.stringify(createMangaDto.genres) : undefined,
      coverImage: createMangaDto.coverImage,
      sourceLanguage: createMangaDto.sourceLanguage,
      targetLanguages: createMangaDto.targetLanguages ? JSON.stringify(createMangaDto.targetLanguages) : undefined,
      tags: createMangaDto.tags ? JSON.stringify(createMangaDto.tags) : undefined,
      viewCount: createMangaDto.viewCount || 0,
      favoriteCount: createMangaDto.favoriteCount || 0,
    };

    const manga = this.mangaRepository.create(mangaData);
    return this.mangaRepository.save(manga);
  }

  async findAll(): Promise<Manga[]> {
    return this.mangaRepository.find();
  }

  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne({ where: { id } });
    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    return manga;
  }

  async update(id: string, updateMangaDto: Partial<UpdateMangaDto>): Promise<Manga> {
    const manga = await this.findOne(id);
    
    const updateData: Partial<Manga> = {
      ...updateMangaDto,
      genres: updateMangaDto.genres ? JSON.stringify(updateMangaDto.genres) : undefined,
      targetLanguages: updateMangaDto.targetLanguages ? JSON.stringify(updateMangaDto.targetLanguages) : undefined,
      tags: updateMangaDto.tags ? JSON.stringify(updateMangaDto.tags) : undefined,
    };

    Object.assign(manga, updateData);
    return this.mangaRepository.save(manga);
  }

  async remove(id: string): Promise<void> {
    const result = await this.mangaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
  }
} 