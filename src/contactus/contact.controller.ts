import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactUsDto, NewsLetterDto } from './dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/send-message')
  async addContactUs(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: ContactUsDto,
  ): Promise<any> {
    return this.contactService.addContactUs(res, req, dto);
  }
  @Post('/news-letter')
  async addNewsLetter(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: NewsLetterDto,
  ): Promise<any> {
    return this.contactService.addNewsLetter(res, req, dto);
  }
}
