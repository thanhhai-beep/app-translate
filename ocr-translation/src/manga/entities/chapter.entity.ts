import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Manga } from './manga.entity';
import { Translation } from '../../translation/entities/translation.entity';

export enum ChapterStatus {
  DRAFT = 'DRAFT',
  TRANSLATING = 'TRANSLATING',
  REVIEWING = 'REVIEWING',
  PUBLISHED = 'PUBLISHED'
}

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'manga_id' })
  mangaId: string;

  @ManyToOne(() => Manga, (manga) => manga.chapters)
  @JoinColumn({ name: 'manga_id' })
  manga: Manga;

  @Column()
  title: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  description: string;

  @Column('text', { name: 'page_urls', nullable: true })
  pageUrls: string;

  @Column({ name: 'page_count', default: 0 })
  pageCount: number;

  @Column({ name: 'source_language', nullable: true })
  sourceLanguage: string;

  @Column('text', { name: 'target_languages', nullable: true })
  targetLanguages: string;

  @OneToMany(() => Translation, (translation) => translation.chapter)
  translations: Translation[];

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 