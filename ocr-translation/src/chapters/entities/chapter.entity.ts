import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Manga } from '../../manga/entities/manga.entity';

export enum ChapterType {
  TEXT = 'text',
  IMAGE = 'image',
}

export enum ChapterStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  HIDDEN = 'hidden'
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image'
}

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  chapterNumber: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: ChapterType,
    default: ChapterType.TEXT,
  })
  type: ChapterType;

  @Column({
    type: 'enum',
    enum: ChapterStatus,
    default: ChapterStatus.DRAFT,
  })
  status: ChapterStatus;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({
    type: 'enum',
    enum: ContentType,
    default: ContentType.TEXT
  })
  contentType: ContentType;

  @ManyToOne(() => Manga, (manga) => manga.chapters)
  @JoinColumn({ name: 'mangaId' })
  manga: Manga;

  @Column()
  mangaId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 