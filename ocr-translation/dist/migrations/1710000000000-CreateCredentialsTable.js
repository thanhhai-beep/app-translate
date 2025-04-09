"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCredentialsTable1710000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateCredentialsTable1710000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'credentials',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['GOOGLE_CLOUD', 'AWS', 'FIREBASE', 'OTHER'],
                    default: "'OTHER'",
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'config',
                    type: 'json',
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('credentials');
    }
}
exports.CreateCredentialsTable1710000000000 = CreateCredentialsTable1710000000000;
//# sourceMappingURL=1710000000000-CreateCredentialsTable.js.map