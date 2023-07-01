import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { addPrivacy, addTerms } from './dto';
import { SettingService } from './settings.service';

@Controller('setting')
export class SettingController {
  constructor(private settingSerivce: SettingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('/add-privacy/:id')
  async adPrivacy(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: addPrivacy,
  ) {
    return this.settingSerivce.addPrivacy(res, req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/add-terms/:id')
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
  @Get('/terms')
  async getterms(@Response() res: any, @Request() req: any) {
    return this.settingSerivce.getTerms(res, req);
  }
}
