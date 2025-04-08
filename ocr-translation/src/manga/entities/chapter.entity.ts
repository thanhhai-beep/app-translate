import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manga } from './manga.entity';
import { Translation } from '../../translation/entities/translation.entity';

export enum ChapterStatus {
  DRAFT = 'DRAFT',
  TRANSLATING = 'TRANSLATING',
  REVIEWING = 'REVIEWING',
  PUBLISHED = 'PUBLISHED'
}

@Entity('chapter')
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'manga_id' })
  mangaId: string;

  @ManyToOne(() => Manga, (manga) => manga.chapters)
  @JoinColumn({ name: 'manga_id' })
  manga: Manga;

  @Column({ name: 'chapter_number' })
  chapterNumber: number;

  @Column()
  title: string;

  @Column({ name: 'original_title' })
  originalTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column('text', { name: 'page_urls', array: true, nullable: true })
  pageUrls: string[];

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'source_language', nullable: true })
  sourceLanguage: string;

  @Column('text', { name: 'target_languages', array: true, nullable: true })
  targetLanguages: string[];

  @OneToMany(() => Translation, (translation) => translation.chapter)
  translations: Translation[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 