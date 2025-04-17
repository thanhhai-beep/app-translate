import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Manga } from '../../manga/entities/manga.entity';
import { Chapter } from '@/chapters/entities/chapter.entity';

export enum AudioStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('audio')
export class Audio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'manga_id' })
  mangaId: string;

  @ManyToOne(() => Manga)
  @JoinColumn({ name: 'manga_id' })
  manga: Manga;

  @Column({ name: 'start_chapter_id' })
  startChapterId: string;

  @ManyToOne(() => Chapter)
  @JoinColumn({ name: 'start_chapter_id' })
  startChapter: Chapter;

  @Column({ name: 'end_chapter_id' })
  endChapterId: string;

  @ManyToOne(() => Chapter)
  @JoinColumn({ name: 'end_chapter_id' })
  endChapter: Chapter;

  @Column({ name: 'file_path', length: 255 })
  filePath: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ name: 'file_size', nullable: true })
  fileSize: number;

  @Column({ length: 10, default: 'mp3' })
  format: string;

  @Column({ nullable: true })
  bitrate: number;

  @Column({ name: 'sample_rate', nullable: true })
  sampleRate: number;

  @Column({ nullable: true, default: 2 })
  channels: number;

  @Column({
    type: 'enum',
    enum: AudioStatus,
    default: AudioStatus.PROCESSING,
  })
  status: AudioStatus;

  @Column({ name: 'error_message', nullable: true, type: 'text' })
  errorMessage: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 