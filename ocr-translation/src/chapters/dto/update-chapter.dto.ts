import { IsNumber, IsString, IsOptional, IsEnum, IsArray, IsNotEmpty } from 'class-validator';
import { ChapterType, ChapterStatus } from '../entities/chapter.entity';
import { ContentType } from '../entities/chapter.entity';

export class UpdateChapterDto {
  @IsNotEmpty()
  @IsOptional()
  chapterNumber?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(ChapterType)
  @IsOptional()
  type?: ChapterType;

  @IsEnum(ContentType)
  @IsOptional()
  contentType?: ContentType;

  @IsEnum(ChapterStatus)
  @IsOptional()
  status?: ChapterStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
} 