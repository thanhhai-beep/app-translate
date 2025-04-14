import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manga } from '../manga/entities/manga.entity';
import { Chapter, ChapterStatus } from '../chapters/entities/chapter.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getMangaList(page: number = 1, pageSize: number = 10, category?: string) {
    const skip = (page - 1) * pageSize;
    const query = this.mangaRepository
      .createQueryBuilder('manga')
      .leftJoinAndSelect('manga.categories', 'category')
      .where('manga.status = :status', { status: 'PUBLISHED' });

    if (category) {
      query.andWhere('category.id = :categoryId', { categoryId: category });
    }

    const [data, total] = await query
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return { data, total };
  }

  async getMangaDetail(id: string) {
    const manga = await this.mangaRepository.findOne({
      where: { id, status: 'PUBLISHED' },
      relations: ['categories'],
    });

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    return manga;
  }

  async getChapterList(mangaId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const [data, total] = await this.chapterRepository.findAndCount({
      where: { mangaId, status: ChapterStatus.PUBLISHED },
      order: { chapterNumber: 'ASC' },
      skip,
      take: pageSize,
    });

    return { data, total };
  }

  async getChapterDetail(mangaId: string, chapterId: string) {
    const chapter = await this.chapterRepository.findOne({
      where: { id: chapterId, mangaId, status: ChapterStatus.PUBLISHED },
    });

    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }

    return chapter;
  }

  async getCategories() {
    return this.categoryRepository.find();
  }
} 