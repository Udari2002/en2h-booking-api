import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This enforces the @Exclude() decorator to hide passwords!
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  // This turns on automatic validation for our future inputs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();