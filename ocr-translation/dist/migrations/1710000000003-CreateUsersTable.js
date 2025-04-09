"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1710000000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1710000000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'roles',
                    type: 'json',
                    default: "'[\"USER\"]'",
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'preferences',
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1710000000003 = CreateUsersTable1710000000003;
//# sourceMappingURL=1710000000003-CreateUsersTable.js.map