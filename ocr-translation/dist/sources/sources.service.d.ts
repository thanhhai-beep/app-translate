import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { HttpService } from '@nestjs/axios';
import { Manga } from '../manga/entities/manga.entity';
import { Chapter } from '../manga/entities/chapter.entity';
import { MangaInfo } from './types/manga-info.interface';
import { ImageService } from 'src/services/image.service';
import { Category } from 'src/categories/category.entity';
export declare class SourcesService {
    private readonly sourceRepository;
    private readonly mangaRepository;
    private readonly chapterRepository;
    private readonly categoryRepository;
    private readonly httpService;
    private readonly imageService;
    constructor(sourceRepository: Repository<Source>, mangaRepository: Repository<Manga>, chapterRepository: Repository<Chapter>, categoryRepository: Repository<Category>, httpService: HttpService, imageService: ImageService);
    importMangaList(url: string, sourceType: string): Promise<MangaInfo[]>;
    importManga(url: string, sourceType: string): Promise<MangaInfo[]>;
    private detectSourceFromUrl;
    private importFromSource;
    private importFromMangadex;
    private importFromMangabat;
    private importFromMangafox;
    private importFromManmanapp;
    private importFromTruyenchuhay;
    saveMangaList(mangaList: MangaInfo[]): Promise<Manga[]>;
    saveMangaWithImages(mangaInfo: MangaInfo): Promise<Manga>;
}
