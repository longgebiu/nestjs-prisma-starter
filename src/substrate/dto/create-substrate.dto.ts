import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSubstrateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  composition?: string;

  @IsOptional()
  @IsString()
  pretreatment?: string;

  @IsOptional()
  @IsString()
  cleaningMethod?: string;

  @IsOptional()
  @IsString()
  cleaningNotes?: string;

  @IsOptional()
  @IsString()
  processTemp?: string;

  @IsOptional()
  @IsString()
  processPH?: string;

  @IsOptional()
  @IsNumber()
  processTime?: number;

  @IsOptional()
  @IsString()
  bathRatio?: string;

  @IsOptional()
  @IsString()
  suitableDyes?: string;
} 