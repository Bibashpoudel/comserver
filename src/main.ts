import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
import * as Sentry from '@sentry/node';
import { SentryFilter } from './global/sentryFIlter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // abc

  app.use(express.static(join(__dirname, '../public')));
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  // app.use(csurf());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(' company ')
    .setDescription(
      'This will be the sass product with multiple domain according to categories',
    )
    .setVersion('1.0')
    .addTag('Sass')

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
  });

  // Import the filter globally, capturing all exceptions on all routes
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  const PORT = process.env.PORT || 5001;
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT, () => {
    console.log('called');
    console.log(`server is running in port http://localhost:${PORT}`);
  });
}
bootstrap();
