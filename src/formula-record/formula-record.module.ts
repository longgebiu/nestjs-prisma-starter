import { Module } from '@nestjs/common';
import { FormulaRecordController } from './formula-record.controller';
import { FormulaRecordService } from './formula-record.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FormulaRecordController],
  providers: [FormulaRecordService, PrismaService],
})
export class FormulaRecordModule {} 