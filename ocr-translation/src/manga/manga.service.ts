import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from './entities/manga.entity';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createMangaDto: CreateMangaDto): Promise<Manga> {
    const manga = this.mangaRepository.create({
      ...createMangaDto,
      originalTitle: createMangaDto.originalTitle || createMangaDto.title
    });
    
    if (createMangaDto.categoryIds && createMangaDto.categoryIds.length > 0) {
      const categories = await this.categoryRepository.findByIds(createMangaDto.categoryIds);
      manga.categories = categories;
    }

    return this.mangaRepository.save(manga);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ mangas: Manga[]; total: number }> {
    const [mangas, total] = await this.mangaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['categories'],
      order: {
        createdAt: 'DESC',
      },
    });
    return { mangas, total };
  }

  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    return manga;
  }

  async update(id: string, updateMangaDto: UpdateMangaDto): Promise<Manga> {
    const manga = await this.mangaRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    // Update manga properties
    Object.assign(manga, updateMangaDto);

    // Handle categories
    if (updateMangaDto.categoryIds) {
      const categories = await this.categoryRepository.findByIds(updateMangaDto.categoryIds);
      manga.categories = categories;
    }

    return this.mangaRepository.save(manga);
  }

  async remove(id: string): Promise<void> {
    await this.mangaRepository.delete(id);
  }
} 