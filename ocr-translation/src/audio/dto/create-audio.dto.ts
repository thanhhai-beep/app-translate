import { IsString, IsUUID, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateAudioDto {
  @IsString()
  title: string;

  @IsUUID()
  mangaId: string;

  @IsInt()
  @Min(1)
  startChapterNumber: number;

  @IsInt()
  @Min(1)
  endChapterNumber: number;

  @IsOptional()
  @IsInt()
  @Min(32)
  @Max(320)
  bitrate?: number;

  @IsOptional()
  @IsInt()
  @Min(8000)
  @Max(48000)
  sampleRate?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2)
  channels?: number;
} 