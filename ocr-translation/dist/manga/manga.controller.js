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
exports.MangaController = void 0;
const common_1 = require("@nestjs/common");
const manga_service_1 = require("./manga.service");
const create_manga_dto_1 = require("./dto/create-manga.dto");
const update_manga_dto_1 = require("./dto/update-manga.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let MangaController = class MangaController {
    mangaService;
    constructor(mangaService) {
        this.mangaService = mangaService;
    }
    create(createMangaDto) {
        return this.mangaService.create(createMangaDto);
    }
    findAll(page = 1, limit = 10) {
        return this.mangaService.findAll(page, limit);
    }
    findOne(id) {
        return this.mangaService.findOne(id);
    }
    update(id, updateMangaDto) {
        return this.mangaService.update(id, updateMangaDto);
    }
    remove(id) {
        return this.mangaService.remove(id);
    }
};
exports.MangaController = MangaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new manga' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Manga created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manga_dto_1.CreateMangaDto]),
    __metadata("design:returntype", void 0)
], MangaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all manga with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all manga' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MangaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get manga by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return manga by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MangaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update manga' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Manga updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manga_dto_1.UpdateMangaDto]),
    __metadata("design:returntype", void 0)
], MangaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete manga' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Manga deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MangaController.prototype, "remove", null);
exports.MangaController = MangaController = __decorate([
    (0, swagger_1.ApiTags)('manga'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('manga'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [manga_service_1.MangaService])
], MangaController);
//# sourceMappingURL=manga.controller.js.map