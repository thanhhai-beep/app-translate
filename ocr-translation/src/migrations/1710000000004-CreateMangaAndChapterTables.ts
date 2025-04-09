import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMangaAndChapterTables1710000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'chapters',
      new TableForeignKey({
        columnNames: ['manga_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'manga',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chapters');
    await queryRunner.dropTable('manga');
  }
} 