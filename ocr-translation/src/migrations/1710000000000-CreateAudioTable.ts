import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAudioTable1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'audio',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'manga_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'start_chapter_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'end_chapter_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'file_path',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'integer',
            isNullable: true,
            comment: 'Duration in seconds',
          },
          {
            name: 'file_size',
            type: 'integer',
            isNullable: true,
            comment: 'File size in bytes',
          },
          {
            name: 'format',
            type: 'varchar',
            length: '10',
            isNullable: false,
            default: "'mp3'",
          },
          {
            name: 'bitrate',
            type: 'integer',
            isNullable: true,
            comment: 'Bitrate in kbps',
          },
          {
            name: 'sample_rate',
            type: 'integer',
            isNullable: true,
            comment: 'Sample rate in Hz',
          },
          {
            name: 'channels',
            type: 'integer',
            isNullable: true,
            default: 2,
            comment: 'Number of audio channels',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['processing', 'completed', 'failed'],
            default: "'processing'",
          },
          {
            name: 'error_message',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
            comment: 'Additional metadata about the audio file',
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      'audio',
      new TableForeignKey({
        columnNames: ['manga_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'manga',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'audio',
      new TableForeignKey({
        columnNames: ['start_chapter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chapter',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'audio',
      new TableForeignKey({
        columnNames: ['end_chapter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'chapter',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('audio');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const foreignKey of foreignKeys) {
        await queryRunner.dropForeignKey('audio', foreignKey);
      }
    }
    await queryRunner.dropTable('audio');
  }
} 