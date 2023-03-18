import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto, CategoriesDto } from './dto';

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

  @Post('/categoires')
  async addCategories(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: CategoriesDto,
  ) {
    return this.blogService.addCategories(res, req, dto);
  }
}
