import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return this.prisma.equipment.create({
      data: createEquipmentDto,
    });
  }

  async findAll() {
    const equipment = await this.prisma.equipment.findMany();

    // 获取每个设备相关的配方记录
    const equipmentWithFormulas = await Promise.all(
      equipment.map(async equip => {
        const formulas = await this.prisma.formulaRecord.findMany({
          where: { equipmentId: equip.id }
        });
        return {
          ...equip,
          formulas
        };
      })
    );

    return equipmentWithFormulas;
  }

  async findOne(id: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id }
    });

    if (!equipment) return null;

    const formulas = await this.prisma.formulaRecord.findMany({
      where: { equipmentId: id }
    });

    return {
      ...equipment,
      formulas
    };
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const {
      name,
      model,
      stirringMethod,
      tempPrecision,
      capacity,
      feeding,
      status
    } = updateEquipmentDto;

    return this.prisma.equipment.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(model !== undefined && { model }),
        ...(stirringMethod !== undefined && { stirringMethod }),
        ...(tempPrecision !== undefined && { tempPrecision }),
        ...(capacity !== undefined && { capacity }),
        ...(feeding !== undefined && { feeding }),
        ...(status !== undefined && { status })
      }
    });
  }

  remove(id: number) {
    return this.prisma.equipment.delete({
      where: { id },
    });
  }
} 