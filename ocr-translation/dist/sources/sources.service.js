"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const source_entity_1 = require("./entities/source.entity");
const source_entity_2 = require("./entities/source.entity");
const axios_1 = require("@nestjs/axios");
const cheerio = require("cheerio");
const manga_entity_1 = require("../manga/entities/manga.entity");
const chapter_entity_1 = require("../manga/entities/chapter.entity");
const manga_entity_2 = require("../manga/entities/manga.entity");
const fs = require("fs");
let SourcesService = class SourcesService {
    sourceRepository;
    mangaRepository;
    chapterRepository;
    httpService;
    constructor(sourceRepository, mangaRepository, chapterRepository, httpService) {
        this.sourceRepository = sourceRepository;
        this.mangaRepository = mangaRepository;
        this.chapterRepository = chapterRepository;
        this.httpService = httpService;
    }
    async importMangaList(url, sourceType) {
        try {
            const response = await this.httpService.axiosRef.get(url);
            const $ = cheerio.load(response.data);
            const mangaList = [];
            const originUrl = new URL(url).origin;
            $('.classification').each((_, element) => {
                const $element = $(element);
                const title = $element.find('a').text().trim();
                const mangaUrl = $element.find('a').attr('href');
                console.log('Found manga:', { title, mangaUrl });
                if (title && mangaUrl) {
                    mangaList.push({
                        title,
                        url: mangaUrl,
                        sourceType,
                    });
                }
            });
            const detailedMangaList = [];
            for (const mangaInfo of mangaList) {
                try {
                    const fullMangaUrl = originUrl + mangaInfo.url;
                    const mangaResponse = await this.httpService.axiosRef.get(fullMangaUrl);
                    const $manga = cheerio.load(mangaResponse.data);
                    const description = $manga('.describe').text().trim();
                    const coverImage = $manga('.pic img').attr('src');
                    const author = $manga('.describe_title a').text().trim();
                    const status = $manga('.status').text().trim();
                    const genres = $manga('.genres').text().trim();
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
                }
                catch (error) {
                    console.error(`Failed to crawl manga ${mangaInfo.title}:`, error);
                    detailedMangaList.push(mangaInfo);
                }
            }
            console.log('Total manga found:', detailedMangaList.length);
            return detailedMangaList;
        }
        catch (error) {
            console.error('Error in importMangaList:', error);
            throw new Error(`Failed to import manga list: ${error.message}`);
        }
    }
    async importManga(crawlMangaDto) {
        let source;
        if (crawlMangaDto.sourceId) {
            source = await this.sourceRepository.findOne({
                where: { id: crawlMangaDto.sourceId },
            });
        }
        else {
            source = await this.detectSourceFromUrl(crawlMangaDto.url);
        }
        if (!source) {
            throw new common_1.NotFoundException('Source not found');
        }
        return this.importFromSource(crawlMangaDto.url, source);
    }
    async detectSourceFromUrl(url) {
        let source = null;
        let sourceType;
        if (url.includes('mangadex.org')) {
            sourceType = source_entity_2.SourceType.MANGADEX;
        }
        else if (url.includes('mangabat.com')) {
            sourceType = source_entity_2.SourceType.MANGABAT;
        }
        else if (url.includes('mangafox.com')) {
            sourceType = source_entity_2.SourceType.MANGAFOX;
        }
        else if (url.includes('manmanapp.com')) {
            sourceType = source_entity_2.SourceType.MANMANAPP;
        }
        else {
            sourceType = source_entity_2.SourceType.CUSTOM;
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
    async importFromSource(url, source) {
        switch (source.type) {
            case source_entity_2.SourceType.MANGADEX:
                return this.importFromMangadex(url);
            case source_entity_2.SourceType.MANGABAT:
                return this.importFromMangabat(url);
            case source_entity_2.SourceType.MANGAFOX:
                return this.importFromMangafox(url);
            case source_entity_2.SourceType.MANMANAPP:
                return this.importFromManmanapp(url);
            default:
                throw new Error('Unsupported source type');
        }
    }
    async importFromMangadex(url) {
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
                type: manga_entity_2.MangaType.TEXT,
                status: manga_entity_2.MangaStatus.ONGOING,
                coverImage,
                url,
                sourceType: source_entity_2.SourceType.MANGADEX,
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
            });
            return this.mangaRepository.save(manga);
        }
        catch (error) {
            throw new Error(`Failed to import from Mangadex: ${error.message}`);
        }
    }
    async importFromMangabat(url) {
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
                type: manga_entity_2.MangaType.TEXT,
                status: manga_entity_2.MangaStatus.ONGOING,
                coverImage,
                url,
                sourceType: source_entity_2.SourceType.MANGABAT,
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
            });
            return this.mangaRepository.save(manga);
        }
        catch (error) {
            throw new Error(`Failed to import from Mangabat: ${error.message}`);
        }
    }
    async importFromMangafox(url) {
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
                type: manga_entity_2.MangaType.TEXT,
                status: manga_entity_2.MangaStatus.ONGOING,
                coverImage,
                url,
                sourceType: source_entity_2.SourceType.MANGAFOX,
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
            });
            return this.mangaRepository.save(manga);
        }
        catch (error) {
            throw new Error(`Failed to import from Mangafox: ${error.message}`);
        }
    }
    async importFromManmanapp(url) {
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
                type: manga_entity_2.MangaType.TEXT,
                status: manga_entity_2.MangaStatus.ONGOING,
                coverImage,
                url,
                sourceType: source_entity_2.SourceType.MANMANAPP,
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
            });
            return this.mangaRepository.save(manga);
        }
        catch (error) {
            throw new Error(`Failed to import from Manmanapp: ${error.message}`);
        }
    }
    async saveMangaList(mangaList) {
        const savedMangaList = [];
        const data = mangaList;
        for (const mangaInfo of data.mangaList) {
            try {
                const mangadetail = {
                    title: mangaInfo.title,
                    originalTitle: mangaInfo.title,
                    description: mangaInfo.description || '',
                    author: mangaInfo.author || 'Unknown',
                    artist: mangaInfo.author || 'Unknown',
                    publisher: 'Unknown',
                    genres: mangaInfo.genres || '',
                    type: manga_entity_2.MangaType.IMPORT,
                    status: manga_entity_2.MangaStatus.ONGOING,
                    coverImage: mangaInfo.coverImage || '',
                    url: mangaInfo.url,
                    sourceType: mangaInfo.sourceType,
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
                    sourceUrl: mangaInfo.sourceUrl,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const manga = this.mangaRepository.create(mangadetail);
                const savedManga = await this.mangaRepository.save(manga);
                savedMangaList.push(savedManga);
                if (mangaInfo.chapters && mangaInfo.chapters.length > 0) {
                    const chapters = mangaInfo.chapters.map(chapter => {
                        const newChapter = new chapter_entity_1.Chapter();
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
            }
            catch (error) {
                console.error(`Failed to save manga ${mangaInfo.title}:`, error);
            }
        }
        return savedMangaList;
    }
    async saveMangaWithImages(mangaInfo) {
        try {
            let coverImagePath = '';
            if (mangaInfo.coverImage) {
                const imageResponse = await this.httpService.axiosRef.get(mangaInfo.coverImage, {
                    responseType: 'arraybuffer'
                });
                const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                const fileName = `${mangaInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cover.jpg`;
                coverImagePath = `uploads/manga/covers/${fileName}`;
                await fs.promises.writeFile(coverImagePath, imageBuffer);
            }
            const manga = this.mangaRepository.create({
                title: mangaInfo.title,
                originalTitle: mangaInfo.title,
                description: mangaInfo.description || '',
                author: mangaInfo.author || 'Unknown',
                artist: mangaInfo.author || 'Unknown',
                publisher: 'Unknown',
                genres: mangaInfo.genres || '',
                type: manga_entity_2.MangaType.TEXT,
                status: manga_entity_2.MangaStatus.ONGOING,
                coverImage: coverImagePath,
                url: mangaInfo.url,
                sourceType: mangaInfo.sourceType,
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
            });
            const savedManga = await this.mangaRepository.save(manga);
            if (mangaInfo.chapters && mangaInfo.chapters.length > 0) {
                for (const chapter of mangaInfo.chapters) {
                    const newChapter = new chapter_entity_1.Chapter();
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
                    if (chapter.url) {
                        const chapterResponse = await this.httpService.axiosRef.get(chapter.url);
                        const $ = cheerio.load(chapterResponse.data);
                        const imageUrls = $('.page-image img').map((_, el) => $(el).attr('src')).get();
                        if (imageUrls.length > 0) {
                            const chapterDir = `uploads/manga/chapters/${savedManga.id}/${chapter.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
                            await fs.promises.mkdir(chapterDir, { recursive: true });
                            const savedImagePaths = [];
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
        }
        catch (error) {
            console.error('Error saving manga with images:', error);
            throw new Error(`Failed to save manga with images: ${error.message}`);
        }
    }
};
exports.SourcesService = SourcesService;
exports.SourcesService = SourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(source_entity_1.Source)),
    __param(1, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __param(2, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], SourcesService);
//# sourceMappingURL=sources.service.js.map