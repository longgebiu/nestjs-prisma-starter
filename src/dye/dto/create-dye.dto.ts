import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDyeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  fixationRate?: string;

  @IsOptional()
  @IsString()
  structure?: string;

  @IsOptional()
  @IsString()
  compatibility?: string;

  @IsOptional()
  @Transform(({ value }) => JSON.stringify(value))
  concentrations?: string;
} 