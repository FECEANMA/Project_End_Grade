// src/auth/auth.controller.ts
import { Controller, Post, Body, Param, Get, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt')) 
  @Get('users')
getAllUsers() {
  return this.authService.getAllUsers();
}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.email, registerDto.password);
}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('users/:id')
deleteUser(@Param('id') id: string) {
  return this.authService.deleteUserById(id);
}

@UseGuards(AuthGuard('jwt'))
@Delete('delete')
deleteSelf(@Request() req) {
  return this.authService.deleteUserById(req.user.id); 
}
}
