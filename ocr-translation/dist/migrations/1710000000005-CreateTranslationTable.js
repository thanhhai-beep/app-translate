"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTranslationTable1710000000005 = void 0;
const typeorm_1 = require("typeorm");
class CreateTranslationTable1710000000005 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'translation',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'chapter_id',
                    type: 'int',
                },
                {
                    name: 'translator_id',
                    type: 'int',
                },
                {
                    name: 'language',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'content',
                    type: 'json',
                },
                {
                    name: 'translated_text',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'reviewer_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'review_notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'reviewed_at',
                    type: 'timestamp',
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
        await queryRunner.createForeignKey('translation', new typeorm_1.TableForeignKey({
            columnNames: ['chapter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'chapters',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('translation', new typeorm_1.TableForeignKey({
            columnNames: ['translator_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('translation', new typeorm_1.TableForeignKey({
            columnNames: ['reviewer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('translation');
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('translation', foreignKey);
            }
        }
        await queryRunner.dropTable('translation');
    }
}
exports.CreateTranslationTable1710000000005 = CreateTranslationTable1710000000005;
//# sourceMappingURL=1710000000005-CreateTranslationTable.js.map