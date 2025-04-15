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
    const query = this.mangaRepository
      .createQueryBuilder('manga')
      .leftJoinAndSelect('manga.categories', 'category')
      .where('manga.id = :id', { id })
      .andWhere('manga.status = :status', { status: 'PUBLISHED' });

    const sql = query.getQueryAndParameters();
    console.log('Manga Detail Query:', sql);

    const manga = await query.getOne();

    if (!manga) {
      throw new NotFoundException('Manga not found');
    }

    return manga;
  }

  async getChapterList(mangaId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const query = this.chapterRepository
      .createQueryBuilder('chapter')
      .where('chapter.mangaId = :mangaId', { mangaId })
      .andWhere('chapter.status = :status', { status: ChapterStatus.PUBLISHED })
      .orderBy('chapter.chapterNumber', 'ASC');

    const sql = query.getQueryAndParameters();
    console.log('Chapter List Query:', sql);

    const [data, total] = await query
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return { data, total };
  }

  async getChapterDetail(mangaId: string, chapterId: string) {
    const query = this.chapterRepository
      .createQueryBuilder('chapter')
      .where('chapter.id = :chapterId', { chapterId })
      .andWhere('chapter.mangaId = :mangaId', { mangaId })
      .andWhere('chapter.status = :status', { status: ChapterStatus.PUBLISHED });

    const sql = query.getQueryAndParameters();
    console.log('Chapter Detail Query:', sql);

    const chapter = await query.getOne();

    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }

    return chapter;
  }

  async getCategories() {
    const query = this.categoryRepository.createQueryBuilder('category');
    const sql = query.getQueryAndParameters();
    console.log('Categories Query:', sql);
    return query.getMany();
  }
} 