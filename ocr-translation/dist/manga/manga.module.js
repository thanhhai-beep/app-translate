"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const manga_controller_1 = require("./manga.controller");
const manga_service_1 = require("./manga.service");
const manga_entity_1 = require("./entities/manga.entity");
const category_entity_1 = require("../categories/category.entity");
const chapters_module_1 = require("../chapters/chapters.module");
const categories_module_1 = require("../categories/categories.module");
let MangaModule = class MangaModule {
};
exports.MangaModule = MangaModule;
exports.MangaModule = MangaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([manga_entity_1.Manga, category_entity_1.Category]), chapters_module_1.ChaptersModule, categories_module_1.CategoriesModule],
        controllers: [manga_controller_1.MangaController],
        providers: [manga_service_1.MangaService],
        exports: [manga_service_1.MangaService],
    })
], MangaModule);
//# sourceMappingURL=manga.module.js.map