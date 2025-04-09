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
exports.ChapterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chapter_entity_1 = require("./entities/chapter.entity");
let ChapterService = class ChapterService {
    chapterRepository;
    constructor(chapterRepository) {
        this.chapterRepository = chapterRepository;
    }
    async create(mangaId, createChapterDto) {
        const chapterData = {
            mangaId: mangaId,
            number: createChapterDto.chapterNumber,
            title: createChapterDto.title,
            description: createChapterDto.description,
            pageUrls: createChapterDto.pageUrls ? JSON.stringify(createChapterDto.pageUrls) : null,
            sourceLanguage: createChapterDto.sourceLanguage,
            targetLanguages: createChapterDto.targetLanguages ? JSON.stringify(createChapterDto.targetLanguages) : null,
        };
        const chapter = this.chapterRepository.create(chapterData);
        const savedChapter = await this.chapterRepository.save(chapter);
        if (savedChapter.pageUrls) {
            savedChapter.pageUrls = savedChapter.pageUrls;
        }
        if (savedChapter.targetLanguages) {
            savedChapter.targetLanguages = savedChapter.targetLanguages;
        }
        return savedChapter;
    }
    async findByMangaAndNumber(mangaId, chapterNumber) {
        const chapter = await this.chapterRepository.findOne({
            where: { mangaId, number: chapterNumber },
        });
        if (!chapter) {
            throw new common_1.NotFoundException(`Chapter ${chapterNumber} not found for manga ${mangaId}`);
        }
        if (chapter.pageUrls) {
            chapter.pageUrls = chapter.pageUrls;
        }
        if (chapter.targetLanguages) {
            chapter.targetLanguages = chapter.targetLanguages;
        }
        return chapter;
    }
    async findAllByManga(mangaId) {
        const chapters = await this.chapterRepository.find({
            where: { mangaId },
            order: { number: 'ASC' },
        });
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
    async findOne(id, chapterNumber) {
        const chapter = await this.chapterRepository.findOne({ where: { id } });
        if (!chapter) {
            throw new common_1.NotFoundException(`Chapter with ID ${id} not found`);
        }
        if (chapter.pageUrls) {
            chapter.pageUrls = chapter.pageUrls;
        }
        if (chapter.targetLanguages) {
            chapter.targetLanguages = chapter.targetLanguages;
        }
        return chapter;
    }
    async update(id, updateChapterDto) {
        const chapter = await this.findOne(id);
        const updateData = {
            ...updateChapterDto,
            pageUrls: updateChapterDto.pageUrls ? JSON.stringify(updateChapterDto.pageUrls) : undefined,
            targetLanguages: updateChapterDto.targetLanguages ? JSON.stringify(updateChapterDto.targetLanguages) : undefined,
        };
        Object.assign(chapter, updateData);
        const updatedChapter = await this.chapterRepository.save(chapter);
        if (updatedChapter.pageUrls) {
            updatedChapter.pageUrls = updatedChapter.pageUrls;
        }
        if (updatedChapter.targetLanguages) {
            updatedChapter.targetLanguages = updatedChapter.targetLanguages;
        }
        return updatedChapter;
    }
    async remove(id) {
        const result = await this.chapterRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Chapter with ID ${id} not found`);
        }
    }
};
exports.ChapterService = ChapterService;
exports.ChapterService = ChapterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChapterService);
//# sourceMappingURL=chapter.service.js.map