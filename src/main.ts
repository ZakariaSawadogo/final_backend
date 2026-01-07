// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
//
// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//
//   app.useStaticAssets(join(__dirname, '..', 'public'));
//   app.enableCors();
//
//   await app.listen(3000);
// }
// bootstrap();

//------------------------------------------
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { join } from 'path';
// import type { NestExpressApplication } from '@nestjs/platform-express';
//
// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//
//   // Activation CORS pour que le Frontend React puisse communiquer
//   app.enableCors();
//
//   // Validation automatique des DTOs
//   app.useGlobalPipes(new ValidationPipe());
//
//   // Servir les fichiers statiques (Images uploadées)
//   app.useStaticAssets(join(__dirname, '..', 'public'));
//
//   await app.listen(3000);
//   console.log(`Application is running on: ${await app.getUrl()}`);
// }
// bootstrap();

//--------------------------------------

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // Autoriser le Frontend
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public')); // Pour les images
  await app.listen(3000);
  console.log(`Server running on http://localhost:3000`);
}
bootstrap();