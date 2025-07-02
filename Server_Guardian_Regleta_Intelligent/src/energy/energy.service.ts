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


  // Método para recibir dats de energía y hacer monitoreo.
  monitorEnergy(energyData: EnergyDto) {
    const { voltage, current, power } = energyData;
  this.lastMonitoredData = energyData; // <-- guardar último dato recibido

    // Solo mostramos los datos, no se guardan en la base de datos por que asi lo digo yo.
    console.log(`Monitorizando energía: Voltaje: ${voltage}V, Corriente: ${current}A, Potencia: ${power}W`);

    // Si la potencia supera el umbral, se guarda el incidente i o u el evento de sobrecarga.
    if (power > this.ENERGY_THRESHOLD) {
      this.saveOverload({ voltage, current, power, status: 'Sobrecargado', timestamp: new Date() });
    }
  }
getLastMonitoredData() {
  return this.lastMonitoredData;
}
  // Método para guardar un incidente de sobrecarga
  private async saveOverload(overloadData: OverloadDto) {
    const overload = this.overloadRepository.create(overloadData);
    await this.overloadRepository.save(overload);
  }

  // Método para obtener el historial de sobrecargas
  async getOverloadHistory() {
    return this.overloadRepository.find();
  }

  // Método para eliminar todo el historial de sobrecargas
  async deleteOverloadHistory() {
    return this.overloadRepository.clear();
  }

  // Método para eliminar solo un historial de sobrecargas
  async deleteSingleOverload(id: string) {
    const result = await this.overloadRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`No se encontró la sobrecarga con id ${id}`);
  }
  await this.overloadRepository.delete(id);
  return { message: `Sobrecarga con id ${id} eliminada` };
}

}
