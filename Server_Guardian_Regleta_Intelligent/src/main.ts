// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE',   
    allowedHeaders: 'Content-Type, Authorization, x-api-key', 
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
