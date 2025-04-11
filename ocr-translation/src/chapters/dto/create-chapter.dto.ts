import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChapterStatus, ChapterType } from '../entities/chapter.entity';

export class CreateChapterDto {
  @IsUUID()
  @IsNotEmpty()
  mangaId: string;

  @IsNumber()
  @IsNotEmpty()
  chapterNumber: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(ChapterType)
  @IsNotEmpty()
  ChapterType: ChapterType;

  @IsEnum(ChapterStatus)
  @IsOptional()
  status?: ChapterStatus;
} 