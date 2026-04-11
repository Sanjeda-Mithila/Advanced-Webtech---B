import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // গ্লোবাল ভ্যালিডেশন পাইপ সেটআপ
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               
    forbidNonWhitelisted: true,    
    transform: true,              
  }));

  await app.listen(3000);
}
bootstrap();