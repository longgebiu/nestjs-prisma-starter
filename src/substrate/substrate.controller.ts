import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubstrateService } from './substrate.service';
import { CreateSubstrateDto } from './dto/create-substrate.dto';
import { UpdateSubstrateDto } from './dto/update-substrate.dto';

@Controller('substrates')
export class SubstrateController {
  constructor(private readonly substrateService: SubstrateService) {}

  @Post()
  create(@Body() createSubstrateDto: CreateSubstrateDto) {
    return this.substrateService.create(createSubstrateDto);
  }

  @Get()
  findAll() {
    return this.substrateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.substrateService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubstrateDto: UpdateSubstrateDto) {
    return this.substrateService.update(+id, updateSubstrateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.substrateService.remove(+id);
  }
} 