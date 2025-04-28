import { Module } from '@nestjs/common';
import { DyeController } from './dye.controller';
import { DyeService } from './dye.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DyeController],
  providers: [DyeService, PrismaService],
})
export class DyeModule {} 