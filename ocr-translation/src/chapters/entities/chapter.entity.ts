import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Manga } from '../../manga/entities/manga.entity';

export enum ChapterStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mangaId: string;

  @Column()
  chapterNumber: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: ['text', 'image'], default: 'text' })
  contentType: 'text' | 'image';

  @Column({
    type: 'enum',
    enum: ChapterStatus,
    default: ChapterStatus.DRAFT
  })
  status: ChapterStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Manga, manga => manga.chapters)
  @JoinColumn({ name: 'mangaId' })
  manga: Manga;
} 