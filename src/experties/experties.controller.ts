import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { addExpertDto } from './dto';
import { ExpertiesService } from './experties.service';

@Controller('expert')
export class ExpertiesController {
  constructor(private expertService: ExpertiesService) {}

  @Post('/add-experties')
  async addExperties(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: addExpertDto,
  ): Promise<any> {
    return this.expertService.addExpert(res, req, dto);
  }
}
