import { IsString, IsOptional } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  stirringMethod?: string;

  @IsOptional()
  @IsString()
  tempPrecision?: string;

  @IsOptional()
  @IsString()
  capacity?: string;

  @IsOptional()
  @IsString()
  feeding?: string;

  @IsOptional()
  @IsString()
  status?: string;
} 