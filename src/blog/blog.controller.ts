import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';
import { BlogDto, CategoriesDto } from './dto';

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/add-blog')
  async addBlog(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: BlogDto,
  ) {
    return this.blogService.addBlog(res, req, dto);
  }

  @Get('/get-blog')
  async getBlog(@Response() res: any, @Request() req: any) {
    return this.blogService.getBlog(res, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-blog')
  async updateBlog(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: BlogDto,
  ) {
    return this.blogService.updateBlog(res, req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-blog')
  async deleteBlog(@Response() res: any, @Request() req: any) {
    return this.blogService.deleteBlog(res, req);
  }

  // categoreis
  @UseGuards(AuthGuard('jwt'))
  @Post('/add-category')
  async addCategories(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: CategoriesDto,
  ) {
    return this.blogService.addCategory(res, req, dto);
  }

  @Get('/get-categories')
  async getCategories(@Response() res: any, @Request() req: any) {
    return this.blogService.getCategories(res, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update-category')
  async updateCategories(
    @Response() res: any,
    @Request() req: any,
    @Body() dto: CategoriesDto,
  ) {
    return this.blogService.updateCategory(res, req, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-category')
  async deleteCategories(@Response() res: any, @Request() req: any) {
    return this.blogService.deleteCategory(res, req);
  }
}
