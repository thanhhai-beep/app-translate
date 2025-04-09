"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMangaAndChapterTables1710000000004 = void 0;
const typeorm_1 = require("typeorm");
class CreateMangaAndChapterTables1710000000004 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'manga',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'original_title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'author',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'artist',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'publisher',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'genres',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'cover_image',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'source_language',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'target_languages',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'chapters',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid()',
                },
                {
                    name: 'manga_id',
                    type: 'varchar',
                    length: '36',
                },
                {
                    name: 'chapter_number',
                    type: 'int',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'original_title',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'page_urls',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'source_language',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'target_languages',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('chapters', new typeorm_1.TableForeignKey({
            columnNames: ['manga_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'manga',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('chapters');
        await queryRunner.dropTable('manga');
    }
}
exports.CreateMangaAndChapterTables1710000000004 = CreateMangaAndChapterTables1710000000004;
//# sourceMappingURL=1710000000004-CreateMangaAndChapterTables.js.map