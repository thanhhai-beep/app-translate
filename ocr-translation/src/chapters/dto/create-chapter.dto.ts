import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { ChapterStatus } from '../entities/chapter.entity';
import { Type } from 'class-transformer';

export class CreateChapterDto {
  @Type(() => Number)
  @IsNumber()
  chapterNumber: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(ChapterStatus)
  @IsOptional()
  status?: ChapterStatus;

  @IsString()
  @IsOptional()
  contentType?: 'text' | 'image';
} 