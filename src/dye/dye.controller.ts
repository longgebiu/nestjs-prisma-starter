import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DyeService } from './dye.service';
import { CreateDyeDto } from './dto/create-dye.dto';
import { UpdateDyeDto } from './dto/update-dye.dto';

@Controller('dyes')
export class DyeController {
  constructor(private readonly dyeService: DyeService) {}

  @Post()
  create(@Body() createDyeDto: CreateDyeDto) {
    return this.dyeService.create(createDyeDto);
  }

  @Get()
  findAll() {
    return this.dyeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dyeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDyeDto: UpdateDyeDto) {
    return this.dyeService.update(+id, updateDyeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dyeService.remove(+id);
  }
} 