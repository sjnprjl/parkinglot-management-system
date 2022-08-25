import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          return {
            [error.property]: Object.values(error.constraints),
          };
        });
        return new BadRequestException(result);
      },
    }),
  );

  // CORS setup
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
