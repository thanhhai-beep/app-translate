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
exports.ChaptersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_chapter_dto_1 = require("./dto/create-chapter.dto");
const update_chapter_dto_1 = require("./dto/update-chapter.dto");
const multer_1 = require("multer");
const path_1 = require("path");
const chapters_service_1 = require("./chapters.service");
let ChaptersController = class ChaptersController {
    chaptersService;
    constructor(chaptersService) {
        this.chaptersService = chaptersService;
    }
    create(mangaId, createChapterDto, file) {
        try {
            console.log('Creating chapter with data:', { mangaId, createChapterDto, file });
            return this.chaptersService.create(mangaId, {
                ...createChapterDto,
                content: file ? `/uploads/chapters/${file.filename}` : createChapterDto.content,
                contentType: file ? 'image' : 'text',
            });
        }
        catch (error) {
            console.error('Error creating chapter:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll(mangaId, page = 1, pageSize = 10) {
        try {
            console.log('Finding chapters with params:', { mangaId, page, pageSize });
            return this.chaptersService.findAll(mangaId, page, pageSize);
        }
        catch (error) {
            console.error('Error finding chapters:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    findOne(mangaId, id) {
        try {
            console.log('Finding chapter with params:', { mangaId, id });
            return this.chaptersService.findOne(mangaId, id);
        }
        catch (error) {
            console.error('Error finding chapter:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    update(mangaId, id, updateChapterDto, file) {
        try {
            console.log('Updating chapter with data:', { mangaId, id, updateChapterDto, file });
            return this.chaptersService.update(mangaId, id, {
                ...updateChapterDto,
                content: file ? file.path : updateChapterDto.content,
                contentType: file ? 'image' : 'text',
            });
        }
        catch (error) {
            console.error('Error updating chapter:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    remove(mangaId, id) {
        try {
            console.log('Deleting chapter with params:', { mangaId, id });
            return this.chaptersService.remove(mangaId, id);
        }
        catch (error) {
            console.error('Error deleting chapter:', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.ChaptersController = ChaptersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('content', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/chapters',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_chapter_dto_1.CreateChapterDto, Object]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('content', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/chapters',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_chapter_dto_1.UpdateChapterDto, Object]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "remove", null);
exports.ChaptersController = ChaptersController = __decorate([
    (0, common_1.Controller)('manga/:mangaId/chapters'),
    __metadata("design:paramtypes", [chapters_service_1.ChaptersService])
], ChaptersController);
//# sourceMappingURL=chapters.controller.js.map