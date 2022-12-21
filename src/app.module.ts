import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddlerware } from './utils/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactUsModule } from './contactus/contact.module';
import { ExpertiesModule } from './experties/experties.module';
import { SettingModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './jobs/job.module';
@Module({
  imports: [
    ContactUsModule,
    ExpertiesModule,
    SettingModule,
    JobModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/company?directConnection=true',
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlerware).forRoutes('*');
  }
}
