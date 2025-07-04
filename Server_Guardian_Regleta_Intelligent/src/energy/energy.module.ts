// src/energy/energy.module.ts
import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverloadEntity } from './overload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OverloadEntity])],
  providers: [EnergyService],
  controllers: [EnergyController],
})
export class EnergyModule {}
