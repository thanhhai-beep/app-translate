"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourcesModule = void 0;
const common_1 = require("@nestjs/common");
const sources_service_1 = require("./sources.service");
const sources_controller_1 = require("./sources.controller");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const source_entity_1 = require("./entities/source.entity");
const chapter_entity_1 = require("../chapters/chapter.entity");
const entities_1 = require("../manga/entities");
const image_service_1 = require("../services/image.service");
const category_entity_1 = require("../categories/category.entity");
let SourcesModule = class SourcesModule {
};
exports.SourcesModule = SourcesModule;
exports.SourcesModule = SourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([source_entity_1.Source, entities_1.Manga, chapter_entity_1.Chapter, category_entity_1.Category]), axios_1.HttpModule],
        controllers: [sources_controller_1.SourcesController],
        providers: [sources_service_1.SourcesService, image_service_1.ImageService],
        exports: [sources_service_1.SourcesService]
    })
], SourcesModule);
//# sourceMappingURL=sources.module.js.map