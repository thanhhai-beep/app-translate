import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ChapterStatus, ContentType } from '../entities/chapter.entity';

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

  @IsEnum(ContentType)
  @IsNotEmpty()
  contentType: ContentType;

  @IsEnum(ChapterStatus)
  @IsOptional()
  status?: ChapterStatus;
} 