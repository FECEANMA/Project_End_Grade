// src/energy/energy.controller.ts
import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyDto } from '../dto/energy.dto';
import { Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}
@Get('monitor')
getLatestMonitorData() {
  return this.energyService.getLastMonitoredData();
}
  // endpoint para recibir datos de energía (monitorización).
  @Post('monitor')
  monitorEnergy(@Body() energyDto: EnergyDto) {
    this.energyService.monitorEnergy(energyDto);
    return { message: 'Monitoreo recibido' };
  }

  // endpoint para obtener el historl de sobrecargas
  @Get('history')
  getOverloadHistory() {
    return this.energyService.getOverloadHistory();
  }

  // endpoint para eliminar todo el historial de sobrecargas.
  @Delete('history')
  deleteOverloadHistory() {
    return this.energyService.deleteOverloadHistory();
  }

  // endpoint para eliminar un el historial de sobrecargas.
  @Delete('history/:id')
deleteSingleOverload(@Param('id') id: string) {
  return this.energyService.deleteSingleOverload(id);
}

}
