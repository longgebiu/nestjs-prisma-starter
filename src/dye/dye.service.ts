import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateDyeDto } from './dto/create-dye.dto';
import { UpdateDyeDto } from './dto/update-dye.dto';

@Injectable()
export class DyeService {
  constructor(private prisma: PrismaService) {}

  async create(createDyeDto: CreateDyeDto) {
    const data = {
      ...createDyeDto,
      concentrations: typeof createDyeDto.concentrations === 'string'
        ? createDyeDto.concentrations
        : JSON.stringify(createDyeDto.concentrations)
    };

    return this.prisma.dye.create({ data });
  }

  async findAll() {
    const dyes = await this.prisma.dye.findMany();
    
    // 获取每个染料的使用记录
    const dyesWithUsage = await Promise.all(
      dyes.map(async dye => {
        const usages = await this.prisma.dyeUsage.findMany({
          where: { dyeId: dye.id }
        });
        return {
          ...dye,
          usages
        };
      })
    );

    return dyesWithUsage;
  }

  async findOne(id: number) {
    const dye = await this.prisma.dye.findUnique({
      where: { id }
    });

    if (!dye) return null;

    const usages = await this.prisma.dyeUsage.findMany({
      where: { dyeId: id }
    });

    return {
      ...dye,
      usages
    };
  }

  async update(id: number, updateDyeDto: UpdateDyeDto) {
    const {
      name,
      brand,
      type,
      fixationRate,
      structure,
      compatibility,
      concentrations
    } = updateDyeDto;

    return this.prisma.dye.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(brand !== undefined && { brand }),
        ...(type !== undefined && { type }),
        ...(fixationRate !== undefined && { fixationRate }),
        ...(structure !== undefined && { structure }),
        ...(compatibility !== undefined && { compatibility }),
        ...(concentrations !== undefined && { concentrations })
      }
    });
  }

  remove(id: number) {
    return this.prisma.dye.delete({
      where: { id }
    });
  }
} 