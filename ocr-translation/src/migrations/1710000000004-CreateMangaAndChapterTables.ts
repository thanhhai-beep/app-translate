import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMangaAndChapterTables1710000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'manga',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'original_title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'artist',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'publisher',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'genres',
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'cover_image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'source_language',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'target_languages',
            type: 'text',
            isArray: true,
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

    await queryRunner.createTable(
      new Table({
        name: 'chapter',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'manga_id',
            type: 'uuid',
          },
          {
            name: 'chapter_number',
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'original_title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'page_urls',
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'source_language',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'target_languages',
            type: 'text',
            isArray: true,
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
      'chapter',
      new TableForeignKey({
        columnNames: ['manga_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'manga',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chapter');
    await queryRunner.dropTable('manga');
  }
} 