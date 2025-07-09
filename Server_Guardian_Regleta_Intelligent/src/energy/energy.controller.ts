// src/energy/energy.controller.ts
import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyDto } from '../dto/energy.dto';
import { Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { ParseIntPipe } from '@nestjs/common';



@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}
  
@UseGuards(AuthGuard('jwt'))
  @Get('monitor')
getLatestMonitorData() {
  return this.energyService.getLastMonitoredData();
}

  @UseGuards(ApiKeyGuard)
  // endpoint para recibir datos de energía (monitorización).
  @Post('monitor')
  monitorEnergy(@Body() energyDto: EnergyDto) {
    this.energyService.monitorEnergy(energyDto);
    return { message: 'Monitoreo recibido' };
  }

@UseGuards(AuthGuard('jwt'))
  // endpoint para obtener el historl de sobrecargas
  @Get('history')
  getOverloadHistory() {
    return this.energyService.getOverloadHistory();
  }

@UseGuards(AuthGuard('jwt'))
  // endpoint para eliminar todo el historial de sobrecargas.
  @Delete('history')
  deleteOverloadHistory() {
    return this.energyService.deleteOverloadHistory();
  }

@UseGuards(AuthGuard('jwt'))
  // endpoint para eliminar un el historial de sobrecargas.
  @Delete('history/:id')
deleteSingleOverload(@Param('id', ParseIntPipe) id: number) {
  return this.energyService.deleteSingleOverload(id);
}

}
