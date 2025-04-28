import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubstrateDto } from './dto/create-substrate.dto';
import { UpdateSubstrateDto } from './dto/update-substrate.dto';

@Injectable()
export class SubstrateService {
  constructor(private prisma: PrismaService) {}

  create(createSubstrateDto: CreateSubstrateDto) {
    return this.prisma.substrate.create({
      data: createSubstrateDto,
    });
  }

  async findAll() {
    const substrates = await this.prisma.substrate.findMany();

    // 获取每个基材相关的配方记录
    const substratesWithFormulas = await Promise.all(
      substrates.map(async substrate => {
        const formulas = await this.prisma.formulaRecord.findMany({
          where: { substrateId: substrate.id }
        });
        return {
          ...substrate,
          formulas
        };
      })
    );

    return substratesWithFormulas;
  }

  async findOne(id: number) {
    const substrate = await this.prisma.substrate.findUnique({
      where: { id }
    });

    if (!substrate) return null;

    const formulas = await this.prisma.formulaRecord.findMany({
      where: { substrateId: id }
    });

    return {
      ...substrate,
      formulas
    };
  }

  async update(id: number, updateSubstrateDto: UpdateSubstrateDto) {
    const {
      name,
      composition,
      pretreatment,
      weight
    } = updateSubstrateDto;

    return this.prisma.substrate.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(composition !== undefined && { composition }),
        ...(pretreatment !== undefined && { pretreatment }),
        ...(weight !== undefined && { weight })
      }
    });
  }

  remove(id: number) {
    return this.prisma.substrate.delete({
      where: { id },
    });
  }
} 