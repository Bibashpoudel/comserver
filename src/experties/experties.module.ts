import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpertiesController } from './experties.controller';
import { Expert, expertSchema } from './experties.schema';
import { ExpertiesService } from './experties.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expert.name, schema: expertSchema }]),
  ],
  controllers: [ExpertiesController],
  providers: [ExpertiesService],
})
export class ExpertiesModule {}
