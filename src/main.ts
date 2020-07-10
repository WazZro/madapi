import path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_OPTIONS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS_OPTIONS);
  // app.useStaticAssets({
  //   root: path.join(__dirname, '../public'),
  //   prefix: '/api/v2/public',
  // });

  await app.listen(3000);
}
bootstrap();
