import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';
import { Category } from '../../categories/category.entity';

export enum MangaStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  DROPPED = 'DROPPED'
}

export enum MangaType {
  COMIC = 'comic',
  TEXT = 'text',
  IMPORT = "import"
}

@Entity('manga')
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  originalTitle: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  status: string;

  @Column('text', { nullable: true })
  genres: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage: string;

  @Column({ name: 'source_language', nullable: true })
  sourceLanguage: string;

  @Column('text', { name: 'target_languages', nullable: true })
  targetLanguages: string;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'manga_categories',
    joinColumn: { name: 'manga_id' },
    inverseJoinColumn: { name: 'category_id' }
  })
  categories: Category[];

  @OneToMany(() => Chapter, (chapter) => chapter.manga)
  chapters: Chapter[];

  @Column({ type: 'json', nullable: true })
  metadata: any;

  @Column({ type: 'json', nullable: true })
  translation: {
    sourceLanguage: string;
    targetLanguages: string[];
    team?: string;
    status: string;
  };

  @Column('text', { nullable: true })
  tags: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  favoriteCount: number;
  
  @Column({ nullable: true })
  sourceUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: MangaType,
    default: MangaType.TEXT
  })
  type: MangaType;
} 