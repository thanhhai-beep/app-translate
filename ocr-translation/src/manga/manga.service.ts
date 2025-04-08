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
    const manga = this.mangaRepository.create(createMangaDto);
    return await this.mangaRepository.save(manga);
  }

  async findAll(): Promise<Manga[]> {
    return await this.mangaRepository.find({
      relations: ['chapters'],
    });
  }

  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne({
      where: { id },
      relations: ['chapters'],
    });
    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    return manga;
  }

  async update(id: string, updateMangaDto: UpdateMangaDto): Promise<Manga> {
    const manga = await this.findOne(id);
    Object.assign(manga, updateMangaDto);
    return await this.mangaRepository.save(manga);
  }

  async remove(id: string): Promise<void> {
    const manga = await this.findOne(id);
    await this.mangaRepository.remove(manga);
  }
} 