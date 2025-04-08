import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTranslationTable1710000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'translation',
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
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'jsonb',
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reviewer_id',
            type: 'uuid',
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'translation',
      new TableForeignKey({
        columnNames: ['chapter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chapter',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'translation',
      new TableForeignKey({
        columnNames: ['translator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'translation',
      new TableForeignKey({
        columnNames: ['reviewer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('translation');
  }
} 