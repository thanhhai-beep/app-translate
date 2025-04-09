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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const chapter_service_1 = require("./chapter.service");
const create_chapter_dto_1 = require("./dto/create-chapter.dto");
const update_chapter_dto_1 = require("./dto/update-chapter.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
let ChapterController = class ChapterController {
    chapterService;
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    create(mangaId, createChapterDto) {
        return this.chapterService.create(mangaId, createChapterDto);
    }
    findAll(mangaId) {
        return this.chapterService.findAllByManga(mangaId);
    }
    findOne(mangaId, chapterNumber) {
        return this.chapterService.findOne(mangaId, chapterNumber);
    }
    update(mangaId, updateChapterDto) {
        return this.chapterService.update(mangaId, updateChapterDto);
    }
    remove(mangaId) {
        return this.chapterService.remove(mangaId);
    }
};
exports.ChapterController = ChapterController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_chapter_dto_1.CreateChapterDto]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('mangaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':chapterNumber'),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Param)('chapterNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':chapterNumber'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('mangaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':chapterNumber'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('mangaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "remove", null);
exports.ChapterController = ChapterController = __decorate([
    (0, common_1.Controller)('manga/:mangaId/chapters'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
//# sourceMappingURL=chapter.controller.js.map