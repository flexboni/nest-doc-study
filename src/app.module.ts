import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AccountController } from 'src/account/account.controller';
import { AdminController } from 'src/admin/admin.controller';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { CatsController } from 'src/cats/cats.controller';
import { CatsModule } from 'src/cats/cats.module';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { logger } from 'src/common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController, AccountController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude(
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
