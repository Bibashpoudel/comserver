import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/add')
  async addBlog(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: BlogDto,
  ) {
    return this.blogService.addBlog(res, req, dto);
  }
}
