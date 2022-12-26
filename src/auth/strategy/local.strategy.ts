import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from '../users.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username);
    const user = await this.authService.validateUser(username, password);

    console.log('user', user);
    if (user.status == false) {
      throw new HttpException(user, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
