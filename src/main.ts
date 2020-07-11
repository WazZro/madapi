import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_OPTIONS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS_OPTIONS);

  await app.listen(3000);
}
bootstrap();
