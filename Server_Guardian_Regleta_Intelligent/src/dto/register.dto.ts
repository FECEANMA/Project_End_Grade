// src/dto/register.dto.ts
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @IsEmail()
  @Matches(/@(gmail|hotmail|outlook|yahoo)\.com$/, {
    message: 'Solo se permiten emails de gmail, hotmail, outlook o yahoo',
  })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
