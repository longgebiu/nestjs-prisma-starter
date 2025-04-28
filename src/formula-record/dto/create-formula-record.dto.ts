import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class DyeUsageDto {
  @IsNumber()
  dyeId: number;

  @IsString()
  concentration: string;
}

export class CreateFormulaRecordDto {
  @IsString()
  formulaId: string;

  @IsString()
  lightReflectivity: string;

  @IsOptional()
  @IsNumber()
  substrateId?: number;

  @IsOptional()
  @IsNumber()
  equipmentId?: number;

  @IsOptional()
  @IsString()
  tempRate?: string;

  @IsOptional()
  @IsString()
  holdTime?: string;

  @IsOptional()
  @IsString()
  pH?: string;

  @IsOptional()
  @IsString()
  ratio?: string;

  @IsOptional()
  @IsString()
  stirringRate?: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @Transform(({ value }) => JSON.stringify(value))
  concentrations?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DyeUsageDto)
  dyes: DyeUsageDto[];
} 