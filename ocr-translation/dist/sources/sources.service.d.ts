import { Repository } from 'typeorm';
import { Source } from './entities/source.entity';
import { CrawlMangaDto } from './dto/crawl-manga.dto';
import { HttpService } from '@nestjs/axios';
import { Manga } from '../manga/entities/manga.entity';
import { Chapter } from '../manga/entities/chapter.entity';
import { MangaInfo } from './types/manga-info.interface';
export declare class SourcesService {
    private readonly sourceRepository;
    private readonly mangaRepository;
    private readonly chapterRepository;
    private readonly httpService;
    constructor(sourceRepository: Repository<Source>, mangaRepository: Repository<Manga>, chapterRepository: Repository<Chapter>, httpService: HttpService);
    importMangaList(url: string, sourceType: string): Promise<MangaInfo[]>;
    importManga(crawlMangaDto: CrawlMangaDto): Promise<Manga>;
    private detectSourceFromUrl;
    private importFromSource;
    private importFromMangadex;
    private importFromMangabat;
    private importFromMangafox;
    private importFromManmanapp;
    saveMangaList(mangaList: MangaInfo[]): Promise<Manga[]>;
    saveMangaWithImages(mangaInfo: MangaInfo): Promise<Manga>;
}
