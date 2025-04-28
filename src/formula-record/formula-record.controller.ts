import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { FormulaRecordService } from './formula-record.service';
import { CreateFormulaRecordDto } from './dto/create-formula-record.dto';
import { UpdateFormulaRecordDto } from './dto/update-formula-record.dto';

@Controller('formula-records')
export class FormulaRecordController {
  constructor(private readonly formulaRecordService: FormulaRecordService) {}

  @Post()
  create(@Body() createFormulaRecordDto: CreateFormulaRecordDto) {
    return this.formulaRecordService.create(createFormulaRecordDto);
  }

  @Get()
  findAll() {
    return this.formulaRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulaRecordService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFormulaRecordDto: UpdateFormulaRecordDto) {
    return this.formulaRecordService.update(+id, updateFormulaRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulaRecordService.remove(+id);
  }
} 