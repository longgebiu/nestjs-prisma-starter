import { Module } from '@nestjs/common';
import { SubstrateController } from './substrate.controller';
import { SubstrateService } from './substrate.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SubstrateController],
  providers: [SubstrateService, PrismaService],
})
export class SubstrateModule {} 