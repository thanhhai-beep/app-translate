import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {}

  async create(createChapterDto: CreateChapterDto[]): Promise<Chapter[]> {
    const chapters = this.chapterRepository.create(createChapterDto as any);
    return this.chapterRepository.save(chapters);
  }


  async findAll(mangaId: string, page: number = 1, limit: number = 10): Promise<{ data: Chapter[]; total: number }> {
    const [data, total] = await this.chapterRepository.findAndCount({
      where: { mangaId },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        number: 'ASC',
      },
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne({ where: { id } });
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
    return chapter;
  }

  async update(id: string, updateChapterDto: UpdateChapterDto): Promise<Chapter> {
    const chapter = await this.findOne(id);
    Object.assign(chapter, updateChapterDto);
    return this.chapterRepository.save(chapter);
  }

  async remove(id: string): Promise<void> {
    const result = await this.chapterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
  }
} 