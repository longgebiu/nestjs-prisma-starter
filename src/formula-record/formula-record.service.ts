import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFormulaRecordDto } from './dto/create-formula-record.dto';
import { UpdateFormulaRecordDto } from './dto/update-formula-record.dto';

@Injectable()
export class FormulaRecordService {
  constructor(private prisma: PrismaService) {}

  async create(createFormulaRecordDto: CreateFormulaRecordDto) {
    const { dyes, ...data } = createFormulaRecordDto;
    
    // 检查 formulaId 是否已存在
    const existingRecord = await this.prisma.formulaRecord.findUnique({
      where: { formulaId: data.formulaId }
    });

    if (existingRecord) {
      throw new ConflictException(`配方编号 ${data.formulaId} 已存在`);
    }
    
    // 创建配方记录和染料使用记录
    const record = await this.prisma.formulaRecord.create({
      data: {
        ...data,
        dyes: {
          create: dyes,
        },
      },
    });

    // 手动获取关联数据
    const [substrate, equipment] = await Promise.all([
      data.substrateId ? this.prisma.substrate.findUnique({
        where: { id: data.substrateId }
      }) : null,
      data.equipmentId ? this.prisma.equipment.findUnique({
        where: { id: data.equipmentId }
      }) : null
    ]);

    // 获取染料使用记录及对应的染料信息
    const dyeUsages = await this.prisma.dyeUsage.findMany({
      where: { formulaId: record.id }
    });

    const dyeDetails = await Promise.all(
      dyeUsages.map(async usage => {
        const dye = await this.prisma.dye.findUnique({
          where: { id: usage.dyeId }
        });
        return {
          ...usage,
          dye
        };
      })
    );

    // 返回完整数据
    return {
      ...record,
      substrate,
      equipment,
      dyes: dyeDetails
    };
  }

  async findAll() {
    const records = await this.prisma.formulaRecord.findMany({
      include: {
        dyes: true
      }
    });

    // 手动获取每个记录的关联数据
    const enrichedRecords = await Promise.all(
      records.map(async record => {
        const [substrate, equipment] = await Promise.all([
          record.substrateId ? this.prisma.substrate.findUnique({
            where: { id: record.substrateId }
          }) : null,
          record.equipmentId ? this.prisma.equipment.findUnique({
            where: { id: record.equipmentId }
          }) : null
        ]);

        const dyeDetails = await Promise.all(
          record.dyes.map(async usage => {
            const dye = await this.prisma.dye.findUnique({
              where: { id: usage.dyeId }
            });
            return {
              ...usage,
              dye
            };
          })
        );

        return {
          ...record,
          substrate,
          equipment,
          dyes: dyeDetails
        };
      })
    );

    return enrichedRecords;
  }

  async findOne(id: number) {
    const record = await this.prisma.formulaRecord.findUnique({
      where: { id },
      include: {
        dyes: true
      }
    });

    if (!record) return null;

    // 手动获取关联数据
    const [substrate, equipment] = await Promise.all([
      record.substrateId ? this.prisma.substrate.findUnique({
        where: { id: record.substrateId }
      }) : null,
      record.equipmentId ? this.prisma.equipment.findUnique({
        where: { id: record.equipmentId }
      }) : null
    ]);

    const dyeDetails = await Promise.all(
      record.dyes.map(async usage => {
        const dye = await this.prisma.dye.findUnique({
          where: { id: usage.dyeId }
        });
        return {
          ...usage,
          dye
        };
      })
    );

    return {
      ...record,
      substrate,
      equipment,
      dyes: dyeDetails
    };
  }

  async update(id: number, updateFormulaRecordDto: UpdateFormulaRecordDto) {
    const {
      lightReflectivity,
      tempRate,
      holdTime,
      pH,
      ratio,
      stirringRate,
      result,
      dyes
    } = updateFormulaRecordDto;

    // 构建更新数据对象，只包含实际提供的字段
    const updateData = {
      ...(lightReflectivity !== undefined && { lightReflectivity }),
      ...(tempRate !== undefined && { tempRate }),
      ...(holdTime !== undefined && { holdTime }),
      ...(pH !== undefined && { pH }),
      ...(ratio !== undefined && { ratio }),
      ...(stirringRate !== undefined && { stirringRate }),
      ...(result !== undefined && { result }),
    };

    // 更新配方记录
    const record = await this.prisma.formulaRecord.update({
      where: { id },
      data: {
        ...updateData,
        // 如果提供了 dyes 数据，则更新染料
        ...(dyes && {
          dyes: {
            deleteMany: {},
            create: dyes.map(({ dyeId, concentration }) => ({
              dyeId,
              concentration
            }))
          }
        })
      },
      include: {
        dyes: true
      }
    });

    // 手动获取关联数据
    const [substrate, equipment] = await Promise.all([
      record.substrateId ? this.prisma.substrate.findUnique({
        where: { id: record.substrateId }
      }) : null,
      record.equipmentId ? this.prisma.equipment.findUnique({
        where: { id: record.equipmentId }
      }) : null
    ]);

    // 获取染料使用记录及对应的染料信息
    const dyeUsages = await this.prisma.dyeUsage.findMany({
      where: { formulaId: record.id }
    });

    const dyeDetails = await Promise.all(
      dyeUsages.map(async usage => {
        const dye = await this.prisma.dye.findUnique({
          where: { id: usage.dyeId }
        });
        return {
          ...usage,
          dye
        };
      })
    );

    return {
      ...record,
      substrate,
      equipment,
      dyes: dyeDetails
    };
  }

  remove(id: number) {
    return this.prisma.formulaRecord.delete({
      where: { id },
    });
  }
} 