import { IsString, IsOptional, IsArray, IsUUID, IsEnum } from 'class-validator';
import { MangaType } from '../entities/manga.entity';

export class CreateMangaDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  originalTitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  artist?: string;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  genres?: string;

  @IsString()
  @IsOptional()
  tags?: string;

  @IsEnum(MangaType)
  @IsOptional()
  type?: MangaType;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  categoryIds?: string[];
}

export class UpdateMangaDto extends CreateMangaDto {} 