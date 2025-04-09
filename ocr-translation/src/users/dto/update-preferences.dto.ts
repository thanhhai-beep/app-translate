import { IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';

export class UpdatePreferencesDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsBoolean()
  notifications?: boolean;

  @IsOptional()
  @IsObject()
  additionalPreferences?: Record<string, any>;
} 