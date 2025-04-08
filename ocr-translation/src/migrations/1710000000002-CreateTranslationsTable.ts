import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTranslationsTable1710000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            type: 'jsonb',
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'statistics',
            type: 'jsonb',
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
      }),
      true,
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'translations',
      new TableForeignKey({
        columnNames: ['chapter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chapters',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'translations',
      new TableForeignKey({
        columnNames: ['translator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('translations');
  }
} 