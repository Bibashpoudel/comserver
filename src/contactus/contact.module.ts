import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contactus, contactusSchema } from './contactus.schema';
import { NewsLetter, newsLetterSchema } from './newsLetter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contactus.name, schema: contactusSchema },
    ]),
    MongooseModule.forFeature([
      { name: NewsLetter.name, schema: newsLetterSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactUsModule {}
