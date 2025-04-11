import { IsString, IsOptional, IsArray, IsUrl, IsUUID, IsEnum } from 'class-validator';
import { MangaType, MangaStatus } from '../entities/manga.entity';

export class UpdateMangaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  originalTitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsEnum(MangaStatus)
  status?: MangaStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetLanguages?: string[];

  @IsEnum(MangaType)
  @IsOptional()
  type?: MangaType;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  categoryIds?: string[];
} 