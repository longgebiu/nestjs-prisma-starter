import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { JwtModule } from '@nestjs/jwt';
import { FormulaRecordModule } from './formula-record/formula-record.module';
import { DyeModule } from './dye/dye.modules';
import { EquipmentModule } from './equipment/equipment.module';
import { SubstrateModule } from './substrate/substrate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: false,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    FormulaRecordModule,
    DyeModule,
    EquipmentModule,
    SubstrateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
  ],
})
export class AppModule {}
