// src/dto/overload.dto.ts
import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';
export class OverloadDto {
  @IsNumber()
  @IsNotEmpty()
  voltage: number;

  @IsNumber()
  @IsNotEmpty()
  current: number;

  @IsNumber()
  @IsNotEmpty()
  power: number; // Potencia en vatios (W)
  
  @IsString()
  @IsNotEmpty()
  status: string; // "sobrecargado"
  
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;
}
