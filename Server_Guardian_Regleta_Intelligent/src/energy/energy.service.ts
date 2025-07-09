// src/energy/energy.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { EnergyDto } from '../dto/energy.dto';
import { OverloadDto } from '../dto/overload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverloadEntity } from './overload.entity';  

@Injectable()
export class EnergyService {
  private readonly ENERGY_THRESHOLD = 2000; // Umbral de energía en vatios (W)

  constructor(
    @InjectRepository(OverloadEntity)
    private readonly overloadRepository: Repository<OverloadEntity>,
  ) {}
  
  private lastMonitoredData: EnergyDto | null = null;


  
  monitorEnergy(energyData: EnergyDto) {
    const { voltage, current, power } = energyData;
  this.lastMonitoredData = energyData; 

    console.log(`Monitorizando energía: Voltaje: ${voltage}V, Corriente: ${current}A, Potencia: ${power}W`);

    if (power > this.ENERGY_THRESHOLD) {
      this.saveOverload({ voltage, current, power, status: 'Sobrecargado', timestamp: new Date() });
    }
  }
getLastMonitoredData() {
  return this.lastMonitoredData;
}
  private async saveOverload(overloadData: OverloadDto) {
    const overload = this.overloadRepository.create(overloadData);
    await this.overloadRepository.save(overload);
  }

  async getOverloadHistory() {
    return this.overloadRepository.find();
  }

  async deleteOverloadHistory() {
    return this.overloadRepository.clear();
  }

  async deleteSingleOverload(id: number) {
    const result = await this.overloadRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`No se encontró la sobrecarga con id ${id}`);
  }
  return { message: `Sobrecarga con id ${id} eliminada` };
}

}
