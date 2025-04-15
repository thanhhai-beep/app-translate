import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { SourceType } from '../entities/source.entity';

export class CrawlMangaDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(SourceType)
  @IsOptional()
  sourceType?: SourceType;

  @IsString()
  @IsOptional()
  sourceId?: string;
} 