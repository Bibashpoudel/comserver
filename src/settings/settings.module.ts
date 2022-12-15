import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Privacy, privacySchema } from './privacy.schema';
import { SettingController } from './settings.controller';
import { SettingService } from './settings.service';
import { Terms, termsSchema } from './terms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Privacy.name, schema: privacySchema }]),
    MongooseModule.forFeature([{ name: Terms.name, schema: termsSchema }]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
