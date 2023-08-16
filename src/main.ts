import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filter/all-exceptions.filter';
import { logger } from 'src/common/middleware/logger.middleware';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  // app.useGlobalFilters(new HttpExceptionFilter());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
