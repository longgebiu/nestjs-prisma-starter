import { PartialType } from '@nestjs/swagger';
import { CreateFormulaRecordDto } from './create-formula-record.dto';

export class UpdateFormulaRecordDto extends PartialType(CreateFormulaRecordDto) {} 