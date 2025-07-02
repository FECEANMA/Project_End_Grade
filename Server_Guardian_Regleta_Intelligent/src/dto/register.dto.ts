// src/dto/register.dto.ts
import { IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  username: string;

  @IsEmail()
  @Matches(/@(gmail|hotmail|outlook|yahoo)\.com$/, {
    message: 'Solo se permiten emails de gmail, hotmail, outlook o yahoo',
  })
  email: string;

  password: string;
}
