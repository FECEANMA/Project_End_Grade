// src/dto/energy.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';
export class EnergyDto {
  @IsNumber()
  @IsNotEmpty()
  voltage: number;

  @IsNumber()
  @IsNotEmpty()
  current: number;

  @IsNumber()
  @IsNotEmpty()
  power: number; // Potencia en vatios (W)
}
