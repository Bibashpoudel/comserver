import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { addPrivacy, addTerms } from './dto';
import { SettingService } from './settings.service';

@Controller('setting')
export class SettingController {
  constructor(private settingSerivce: SettingService) {}

  @Patch('/add-privacy/:id')
  async adPrivacy(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: addPrivacy,
  ) {
    return this.settingSerivce.addPrivacy(res, req, dto);
  }

  @Post('/add-terms')
  async addTerms(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: addTerms,
  ) {
    return this.settingSerivce.addTerms(res, req, dto);
  }
  @Get('/privacy')
  async getPrivacy(@Response() res: any, @Request() req: any) {
    return this.settingSerivce.getPrivacy(res, req);
  }
}
