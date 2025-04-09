import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto, UpdateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
  ) {}

  async create(mangaId: string, createChapterDto: CreateChapterDto): Promise<Chapter> {
    const chapterData = {
      mangaId: mangaId,
      number: createChapterDto.chapterNumber,
      title: createChapterDto.title,
      description: createChapterDto.description,
      pageUrls: createChapterDto.pageUrls ? JSON.stringify(createChapterDto.pageUrls) : null,
      sourceLanguage: createChapterDto.sourceLanguage,
      targetLanguages: createChapterDto.targetLanguages ? JSON.stringify(createChapterDto.targetLanguages) : null,
    };

    const chapter = this.chapterRepository.create(chapterData as DeepPartial<Chapter>);
    const savedChapter = await this.chapterRepository.save(chapter);
    
    // Parse JSON strings back to arrays
    if (savedChapter.pageUrls) {
      savedChapter.pageUrls = savedChapter.pageUrls;
    }
    if (savedChapter.targetLanguages) {
      savedChapter.targetLanguages = savedChapter.targetLanguages
    }
    
    return savedChapter;
  }

  async findByMangaAndNumber(mangaId: string, chapterNumber: number): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne({
      where: { mangaId, number: chapterNumber },
    });
    if (!chapter) {
      throw new NotFoundException(`Chapter ${chapterNumber} not found for manga ${mangaId}`);
    }
    
    // Parse JSON strings back to arrays
    if (chapter.pageUrls) {
      chapter.pageUrls = chapter.pageUrls;
    }
    if (chapter.targetLanguages) {
      chapter.targetLanguages = chapter.targetLanguages;
    }
    
    return chapter;
  }

  async findAllByManga(mangaId: string): Promise<Chapter[]> {
    const chapters = await this.chapterRepository.find({
      where: { mangaId },
      order: { number: 'ASC' },
    });
    
    // Parse JSON strings back to arrays for each chapter
    return chapters.map(chapter => {
      if (chapter.pageUrls) {
        chapter.pageUrls = chapter.pageUrls;
      }
      if (chapter.targetLanguages) {
        chapter.targetLanguages = chapter.targetLanguages;
      }
      return chapter;
    });
  }

  async findOne(id: string, chapterNumber?: number): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne({ where: { id } });
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
    
    // Parse JSON strings back to arrays
    if (chapter.pageUrls) {
      chapter.pageUrls = chapter.pageUrls;
    }
    if (chapter.targetLanguages) {
      chapter.targetLanguages = chapter.targetLanguages;
    }
    
    return chapter;
  }

  async update(id: string, updateChapterDto: Partial<UpdateChapterDto>): Promise<Chapter> {
    const chapter = await this.findOne(id);
    
    const updateData: Partial<Chapter> = {
      ...updateChapterDto,
      pageUrls: updateChapterDto.pageUrls ? JSON.stringify(updateChapterDto.pageUrls) : undefined,
      targetLanguages: updateChapterDto.targetLanguages ? JSON.stringify(updateChapterDto.targetLanguages) : undefined,
    };

    Object.assign(chapter, updateData);
    const updatedChapter = await this.chapterRepository.save(chapter);
    
    // Parse JSON strings back to arrays
    if (updatedChapter.pageUrls) {
      updatedChapter.pageUrls = updatedChapter.pageUrls;
    }
    if (updatedChapter.targetLanguages) {
      updatedChapter.targetLanguages = updatedChapter.targetLanguages;
    }
    
    return updatedChapter;
  }

  async remove(id: string): Promise<void> {
    const result = await this.chapterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }
  }
} 