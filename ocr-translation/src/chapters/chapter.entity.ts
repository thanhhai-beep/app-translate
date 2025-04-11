import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Manga } from '../manga/manga.entity';
import { Transform } from 'class-transformer';

export enum ChapterContentType {
  TEXT = 'text',
  IMAGE = 'image'
}

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  chapterNumber: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ChapterContentType, default: ChapterContentType.TEXT })
  contentType: ChapterContentType;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ default: 'draft' })
  status: string;

  @ManyToOne(() => Manga, manga => manga.chapters)
  manga: Manga;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 