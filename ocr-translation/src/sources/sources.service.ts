import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { SourceType } from './entities/source.entity';
import { CrawlMangaDto } from './dto/crawl-manga.dto';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { Manga } from '../manga/entities/manga.entity';
import { Chapter } from '../manga/entities/chapter.entity';
import { MangaType, MangaStatus } from '../manga/entities/manga.entity';
import { MangaInfo } from './types/manga-info.interface';
import * as fs from 'fs';
import { ImageService } from 'src/services/image.service';
import { Category } from 'src/categories/category.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly httpService: HttpService,
    private readonly imageService: ImageService
  ) {}

  async importMangaList(url: string, sourceType: string): Promise<MangaInfo[]> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);
      const mangaList: MangaInfo[] = [];
      const originUrl = new URL(url).origin;

      $('.classification').each((_, element) => {
        const $element = $(element);
        const title = $element.find('a').text().trim();
        const mangaUrl = $element.find('a').attr('href');

        if (title && mangaUrl) {
          mangaList.push({
            title,
            url: mangaUrl,
            sourceType,
          });
        }
      });

      const detailedMangaList: MangaInfo[] = [];
      for (const mangaInfo of mangaList) {
        try {
          const fullMangaUrl = originUrl + mangaInfo.url;
          const mangaResponse = await this.httpService.axiosRef.get(fullMangaUrl);
          const $manga = cheerio.load(mangaResponse.data);

          const description = $manga('.describe').text().trim();
          const coverImage = $manga('.pic img').attr('src');
          const author = $manga('.describe_title a').text().trim();
          const status = $manga('.status').text().trim();
          const rawGenres = $manga('.describe_title .type').text().trim();
          const genres = rawGenres.split(/[:：]/)[1]?.trim() || '';
          const chapters = $manga('.chapter-list .chapter').map((_, el) => {
            const $el = $(el);
            return {
              title: $el.find('.title').text().trim(),
              url: originUrl + $el.find('a').attr('href'),
              date: $el.find('.date').text().trim(),
            };
          }).get();

          detailedMangaList.push({
            ...mangaInfo,
            url: fullMangaUrl,
            description,
            coverImage,
            author,
            status,
            genres,
            chapters,
          });
        } catch (error) {
          console.error(`Failed to crawl manga ${mangaInfo.title}:`, error);
          detailedMangaList.push(mangaInfo);
        }
      }

      console.log('Total manga found:', detailedMangaList.length);
      return detailedMangaList;
    } catch (error) {
      console.error('Error in importMangaList:', error);
      throw new Error(`Failed to import manga list: ${error.message}`);
    }
  }

  async importManga(url: string, sourceType: string): Promise<MangaInfo[]> {
    let source: Source | null;

    // if (crawlMangaDto.sourceId) {
    //   source = await this.sourceRepository.findOne({
    //     where: { id: crawlMangaDto.sourceId },
    //   });
    // } else {
    //   source = await this.detectSourceFromUrl(url);
    // }

    // if (!source) {
    //   throw new NotFoundException('Source not found');
    // }

    return this.importFromSource(url, sourceType);
  }

  private async detectSourceFromUrl(url: string): Promise<Source> {
    let source: Source | null = null;
    let sourceType: SourceType;

    if (url.includes('mangadex.org')) {
      sourceType = SourceType.MANGADEX;
    } else if (url.includes('mangabat.com')) {
      sourceType = SourceType.MANGABAT;
    } else if (url.includes('mangafox.com')) {
      sourceType = SourceType.MANGAFOX;
    } else if (url.includes('manmanapp.com')) {
      sourceType = SourceType.MANMANAPP;
    } else {
      sourceType = SourceType.CUSTOM;
    }

    source = await this.sourceRepository.findOne({
      where: { type: sourceType },
    });

    if (!source) {
      source = this.sourceRepository.create({
        name: sourceType,
        type: sourceType,
        baseUrl: new URL(url).origin,
        description: `Source for ${sourceType}`,
        isActive: true,
      });
      source = await this.sourceRepository.save(source);
    }

    return source;
  }

  private async importFromSource(url: string, source: string): Promise<MangaInfo[]> {
    switch (source) {
      // case SourceType.MANGADEX:
      //   return this.importFromMangadex(url);
      // case SourceType.MANGABAT:
      //   return this.importFromMangabat(url);
      // case SourceType.MANGAFOX:
      //   return this.importFromMangafox(url);
      case SourceType.MANMANAPP:
        return this.importMangaList(url, "MANMANAPP");
      case SourceType.TRUYENCHUHAY:
        return this.importFromTruyenchuhay(url, "TRUYENCHUHAY");
      default:
        throw new Error('Unsupported source type');
    }
  }

  private async importFromMangadex(url: string): Promise<Manga> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      const title = $('h1').text().trim();
      const description = $('.description').text().trim();
      const coverImage = $('.cover img').attr('src');

      const manga = this.mangaRepository.create({
        title,
        originalTitle: title,
        description,
        author: 'Unknown',
        artist: 'Unknown',
        publisher: 'Unknown',
        genres: '',
        type: MangaType.TEXT,
        status: MangaStatus.ONGOING,
        coverImage,
        url,
        sourceType: SourceType.MANGADEX,
        sourceLanguage: 'ja',
        targetLanguage: 'en',
        targetLanguages: 'en',
        categories: [],
        chapters: [],
        isCompleted: false,
        isPublished: true,
        isDeleted: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Partial<Manga>);

      return this.mangaRepository.save(manga);
    } catch (error) {
      throw new Error(`Failed to import from Mangadex: ${error.message}`);
    }
  }

  private async importFromMangabat(url: string): Promise<Manga> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      const title = $('.story-info-right h1').text().trim();
      const description = $('.story-info-right .story-description').text().trim();
      const coverImage = $('.story-info-left img').attr('src');

      const manga = this.mangaRepository.create({
        title,
        originalTitle: title,
        description,
        author: 'Unknown',
        artist: 'Unknown',
        publisher: 'Unknown',
        genres: '',
        type: MangaType.TEXT,
        status: MangaStatus.ONGOING,
        coverImage,
        url,
        sourceType: SourceType.MANGABAT,
        sourceLanguage: 'ja',
        targetLanguage: 'en',
        targetLanguages: 'en',
        categories: [],
        chapters: [],
        isCompleted: false,
        isPublished: true,
        isDeleted: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Partial<Manga>);

      return this.mangaRepository.save(manga);
    } catch (error) {
      throw new Error(`Failed to import from Mangabat: ${error.message}`);
    }
  }

  private async importFromMangafox(url: string): Promise<Manga> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      const title = $('.manga-title h1').text().trim();
      const description = $('.manga-summary').text().trim();
      const coverImage = $('.manga-cover img').attr('src');

      const manga = this.mangaRepository.create({
        title,
        originalTitle: title,
        description,
        author: 'Unknown',
        artist: 'Unknown',
        publisher: 'Unknown',
        genres: '',
        type: MangaType.TEXT,
        status: MangaStatus.ONGOING,
        coverImage,
        url,
        sourceType: SourceType.MANGAFOX,
        sourceLanguage: 'ja',
        targetLanguage: 'en',
        targetLanguages: 'en',
        categories: [],
        chapters: [],
        isCompleted: false,
        isPublished: true,
        isDeleted: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Partial<Manga>);

      return this.mangaRepository.save(manga);
    } catch (error) {
      throw new Error(`Failed to import from Mangafox: ${error.message}`);
    }
  }

  private async importFromManmanapp(url: string): Promise<Manga> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      const title = $('h1').text().trim();
      const description = $('.description').text().trim();
      const coverImage = $('.cover img').attr('src');

      const manga = this.mangaRepository.create({
        title,
        originalTitle: title,
        description,
        author: 'Unknown',
        artist: 'Unknown',
        publisher: 'Unknown',
        genres: '',
        type: MangaType.TEXT,
        status: MangaStatus.ONGOING,
        coverImage,
        url,
        sourceType: SourceType.MANMANAPP,
        sourceLanguage: 'ja',
        targetLanguage: 'en',
        targetLanguages: 'en',
        categories: [],
        chapters: [],
        isCompleted: false,
        isPublished: true,
        isDeleted: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Partial<Manga>);

      return this.mangaRepository.save(manga);
    } catch (error) {
      throw new Error(`Failed to import from Manmanapp: ${error.message}`);
    }
  }

  private async importFromTruyenchuhay(url: string, sourceType: string): Promise<MangaInfo[]> {
    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);
      const mangaList: MangaInfo[] = [];
      // const originUrl = new URL(url).origin;

      $('h3').each((_, element) => {
        const $element = $(element);
        const title = $element.find('a').text().trim();
        const mangaUrl = $element.find('a').attr('href');

        if (title && mangaUrl) {
          mangaList.push({
            title,
            url: mangaUrl,
            sourceType,
          });
        }
      });

      const detailedMangaList: MangaInfo[] = [];
      for (const mangaInfo of mangaList) {
        try {
          const mangaResponse = await this.httpService.axiosRef.get(mangaInfo.url);
          const $manga = cheerio.load(mangaResponse.data);

          const description = $manga('#gioi-thieu-truyen').text().trim();
          const coverImage = $manga('.book-images img').attr('src');
          const author = $manga('[itemprop="author"] a.capitalize span').text().trim();
          const status = $manga('.status').text().trim();
          const genreElements = $manga('.text-base .whitespace-nowrap a');
          const genres = genreElements.map((_, el) => $(el).text().trim()).get().join(', ');   

          const lengthDiv = $manga('.text-base .flex').filter((_, el) => {
            return $manga(el).find('h3').text().includes('Độ dài');
          }).first();
          const lengthText = lengthDiv.find('span').text().trim();
          const totalChapters = parseInt(lengthText.replace(/[^\d]/g, ''), 10);

          const chapters = [];
          // const chapters = $manga('#danh-sach-chuong li.flex.items-center').map((_, el) => {
          //   const $el = $(el);

          //   const rawTitle = $el.find('a.capitalize').text().trim();
          //   const title = rawTitle.split(':')[1]?.trim() || '';
          //   return {
          //     title: title,
          //     url: originUrl + $el.find('a').attr('href'),
          //     date: $el.find('.date').text().trim(),
          //   };
          // }).get();

          detailedMangaList.push({
            ...mangaInfo,
            url: mangaInfo.url,
            description,
            coverImage,
            author,
            status,
            genres,
            totalChapters,
            chapters,
          });
        } catch (error) {
          console.error(`Failed to crawl manga ${mangaInfo.title}:`, error);
          detailedMangaList.push(mangaInfo);
        }
      }

      return detailedMangaList;
    } catch (error) {
      console.error('Error in importMangaList:', error);
      throw new Error(`Failed to import manga list: ${error.message}`);
    }
  }

  async saveMangaList(mangaList: MangaInfo[]): Promise<Manga[]> {
    const savedMangaList: Manga[] = [];
    const data = mangaList as any;
    
    for (const mangaInfo of data.mangaList) {
      try {
        const coverImagePath = await this.imageService.downloadAndSaveImage(mangaInfo.coverImage);
        
        const genres = mangaInfo.genres ? mangaInfo.genres.split(',').map(g => g.trim()) : [];
        const categories = await Promise.all(
          genres.map(async (genre) => {
            let category = await this.categoryRepository.findOne({ where: { name: genre } });
            if (!category) {
              category = this.categoryRepository.create({
                name: genre,
                description: genre,
                createdAt: new Date(),
                updatedAt: new Date()
              });
              await this.categoryRepository.save(category);
            }
            return category;
          })
        );
        
        const mangadetail = {
          title: mangaInfo.title,
          originalTitle: mangaInfo.title,
          description: mangaInfo.description || '',
          author: mangaInfo.author || 'Unknown',
          artist: mangaInfo.author || 'Unknown',
          publisher: 'Unknown',
          genres: mangaInfo.genres || '',
          type: MangaType.IMPORT,
          status: MangaStatus.ONGOING,
          coverImage: coverImagePath || '',
          url: mangaInfo.url,
          sourceType: mangaInfo.sourceType as SourceType,
          sourceLanguage: 'ja',
          targetLanguage: 'en',
          targetLanguages: 'en',
          categories: categories,
          chapters: [],
          isCompleted: false,
          isPublished: true,
          isDeleted: false,
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          rating: 0,
          ratingCount: 0,
          sourceUrl: mangaInfo.sourceUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Partial<Manga>;
        
        const manga = this.mangaRepository.create(mangadetail);
        const savedManga = await this.mangaRepository.save(manga);
        savedMangaList.push(savedManga);

        if (mangaInfo.chapters && mangaInfo.chapters.length > 0) {
          const chapters = mangaInfo.chapters.map(chapter => {
            const newChapter = new Chapter();
            newChapter.title = chapter.title;
            newChapter.number = 0;
            newChapter.description = '';
            newChapter.pageUrls = chapter.url;
            newChapter.pageCount = 0;
            newChapter.sourceLanguage = 'ja';
            newChapter.targetLanguages = 'en';
            newChapter.viewCount = 0;
            newChapter.manga = savedManga;
            newChapter.mangaId = savedManga.id;
            return newChapter;
          });

          await this.chapterRepository.save(chapters);
        }
      } catch (error) {
        console.error('Error saving manga:', error);
      }
    }

    return savedMangaList;
  }

  async saveMangaWithImages(mangaInfo: MangaInfo): Promise<Manga> {
    try {
      // Download cover image if available
      let coverImagePath = '';
      if (mangaInfo.coverImage) {
        const imageResponse = await this.httpService.axiosRef.get(mangaInfo.coverImage, {
          responseType: 'arraybuffer'
        });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        const fileName = `${mangaInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cover.jpg`;
        coverImagePath = `uploads/manga/covers/${fileName}`;
        // Save image to filesystem
        await fs.promises.writeFile(coverImagePath, imageBuffer);
      }

      // Create manga entity
      const manga = this.mangaRepository.create({
        title: mangaInfo.title,
        originalTitle: mangaInfo.title,
        description: mangaInfo.description || '',
        author: mangaInfo.author || 'Unknown',
        artist: mangaInfo.author || 'Unknown',
        publisher: 'Unknown',
        genres: mangaInfo.genres || '',
        type: MangaType.TEXT,
        status: MangaStatus.ONGOING,
        coverImage: coverImagePath,
        url: mangaInfo.url,
        sourceType: mangaInfo.sourceType as SourceType,
        sourceLanguage: 'ja',
        targetLanguage: 'en',
        targetLanguages: 'en',
        categories: [],
        chapters: [],
        isCompleted: false,
        isPublished: true,
        isDeleted: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        rating: 0,
        ratingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Partial<Manga>);

      const savedManga = await this.mangaRepository.save(manga);

      // Save chapters with images if available
      if (mangaInfo.chapters && mangaInfo.chapters.length > 0) {
        for (const chapter of mangaInfo.chapters) {
          const newChapter = new Chapter();
          newChapter.title = chapter.title;
          newChapter.number = 0;
          newChapter.description = '';
          newChapter.pageUrls = chapter.url;
          newChapter.pageCount = 0;
          newChapter.sourceLanguage = 'ja';
          newChapter.targetLanguages = 'en';
          newChapter.viewCount = 0;
          newChapter.manga = savedManga;
          newChapter.mangaId = savedManga.id;

          // Download chapter images if available
          if (chapter.url) {
            const chapterResponse = await this.httpService.axiosRef.get(chapter.url);
            const $ = cheerio.load(chapterResponse.data);
            const imageUrls = $('.page-image img').map((_, el) => $(el).attr('src')).get();
            
            if (imageUrls.length > 0) {
              const chapterDir = `uploads/manga/chapters/${savedManga.id}/${chapter.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
              await fs.promises.mkdir(chapterDir, { recursive: true });
              
              const savedImagePaths: string[] = [];
              for (const imageUrl of imageUrls) {
                const imageResponse = await this.httpService.axiosRef.get(imageUrl, {
                  responseType: 'arraybuffer'
                });
                const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                const fileName = `page_${savedImagePaths.length + 1}.jpg`;
                const imagePath = `${chapterDir}/${fileName}`;
                await fs.promises.writeFile(imagePath, imageBuffer);
                savedImagePaths.push(imagePath);
              }
              
              newChapter.pageUrls = savedImagePaths.join(',');
              newChapter.pageCount = savedImagePaths.length;
            }
          }

          await this.chapterRepository.save(newChapter);
        }
      }

      return savedManga;
    } catch (error) {
      console.error('Error saving manga with images:', error);
      throw new Error(`Failed to save manga with images: ${error.message}`);
    }
  }
} 