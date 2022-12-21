import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
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
  @Get('/message')
  async getContactUs(@Response() res: any, @Request() req: any): Promise<any> {
    console.log('sunim');
    return this.contactService.getContactUS(res, req);
  }
  @Post('/news-letter')
  async addNewsLetter(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: NewsLetterDto,
  ): Promise<any> {
    return this.contactService.addNewsLetter(res, req, dto);
  }

  @Get('/news-letter/users')
  async getNewsLetter(@Response() res: any, @Request() req: any): Promise<any> {
    return this.contactService.getNewsLetter(res, req);
  }
}
