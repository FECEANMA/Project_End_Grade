// src/dto/overload.dto.ts
export class OverloadDto {
  voltage: number;
  current: number;
  power: number; // Potencia en vatios (W)
  status: string; // "sobrecargado"
  timestamp: Date;
}
