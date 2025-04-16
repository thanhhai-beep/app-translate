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
exports.SourcesController = void 0;
const common_1 = require("@nestjs/common");
const sources_service_1 = require("./sources.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const import_manga_list_dto_1 = require("./dto/import-manga-list.dto");
let SourcesController = class SourcesController {
    sourcesService;
    constructor(sourcesService) {
        this.sourcesService = sourcesService;
    }
    async importMangaList(importMangaListDto) {
        return this.sourcesService.importManga(importMangaListDto.url, importMangaListDto.sourceType);
    }
    async saveMangaList(mangaList) {
        return this.sourcesService.saveMangaList(mangaList);
    }
    async saveMangaWithImages(mangaInfo) {
        return this.sourcesService.saveMangaWithImages(mangaInfo);
    }
};
exports.SourcesController = SourcesController;
__decorate([
    (0, common_1.Post)('import-list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [import_manga_list_dto_1.ImportMangaListDto]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "importMangaList", null);
__decorate([
    (0, common_1.Post)('save-manga-list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "saveMangaList", null);
__decorate([
    (0, common_1.Post)('save-manga-with-images'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SourcesController.prototype, "saveMangaWithImages", null);
exports.SourcesController = SourcesController = __decorate([
    (0, common_1.Controller)('sources'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sources_service_1.SourcesService])
], SourcesController);
//# sourceMappingURL=sources.controller.js.map