// src/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async register(username: string, email: string, password: string) {
    const existingUser = await this.userRepo.findOne({
    where: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ConflictException('El usuario o correo ya existe');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = this.userRepo.create({ username, email, password: hashed });
  await this.userRepo.save(user);
  return { message: 'Usuario registrado' };
}
  async login(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = this.jwtService.sign({ sub: user.id, username: user.username });
    return { token };
  }
}
