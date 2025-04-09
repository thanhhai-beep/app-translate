"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTranslationsTable1710000000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateTranslationsTable1710000000002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'translations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'chapter_id',
                    type: 'uuid',
                },
                {
                    name: 'translator_id',
                    type: 'uuid',
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['PENDING', 'IN_PROGRESS', 'REVIEWING', 'APPROVED', 'REJECTED'],
                    default: "'PENDING'",
                },
                {
                    name: 'content',
                    type: 'json',
                },
                {
                    name: 'metadata',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'statistics',
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
        await queryRunner.createForeignKey('translations', new typeorm_1.TableForeignKey({
            columnNames: ['chapter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'chapters',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('translations', new typeorm_1.TableForeignKey({
            columnNames: ['translator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('translations');
    }
}
exports.CreateTranslationsTable1710000000002 = CreateTranslationsTable1710000000002;
//# sourceMappingURL=1710000000002-CreateTranslationsTable.js.map