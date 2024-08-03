import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app-module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

(async () => {
  await bootstrap();
})();
