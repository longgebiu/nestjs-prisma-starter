import { PartialType } from '@nestjs/swagger';
import { CreateSubstrateDto } from './create-substrate.dto';

export class UpdateSubstrateDto extends PartialType(CreateSubstrateDto) {} 