import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class CreateMangaDto {
  @IsString()
  title: string;

  @IsString()
  originalTitle: string;

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
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetLanguages?: string[];
} 