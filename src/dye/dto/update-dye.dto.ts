import { PartialType } from '@nestjs/swagger';
import { CreateDyeDto } from './create-dye.dto';

export class UpdateDyeDto extends PartialType(CreateDyeDto) {} 