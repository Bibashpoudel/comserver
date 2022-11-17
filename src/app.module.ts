import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddlerware } from './utils/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactUsModule } from './contactus/contact.module';
@Module({
  imports: [
    ContactUsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/company'),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlerware).forRoutes('*');
  }
}
