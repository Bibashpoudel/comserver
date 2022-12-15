import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import RoleGuard from './strategy/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
  @UseGuards(RoleGuard('user'))
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  async test(@Request() req: any) {
    return req.user;
  }

  @Get('admin-seed')
  async adminSeed(@Response() res: any) {
    return this.authService.adminSeed(res);
  }
}
