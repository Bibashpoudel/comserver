import { HttpStatus, Injectable, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendResponse } from 'src/global/response.helper';
import { User, userDocument } from './users.schema';

import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('test', username);
    const user = await this.userModel.findOne({
      email: username.trim().toLowerCase(),
    });

    if (!user) {
      return {
        user: user,
        status: false,
        message: 'Invalid Username Or Password',
      };
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        user.password = null;
        return user;
      } else {
        return { message: 'Invalid Username Or Password', status: false };
      }
    }
  }

  async login(user: any) {
    console.log(user);
    return {
      access_token: this.jwtService.sign({ user: user, sub: 1 }),
    };
  }
  async userName(username: any) {
    try {
      const user = await this.userModel.findOne({ email: username });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {}
  }

  async adminSeed(res: any) {
    try {
      const newUser = new this.userModel({
        email: 'admin@gmail.com',
        fullName: 'Admin',
        role: 'admin',
        password: await bcrypt.hash('Superadmin123', 10),
      });
      await newUser.save();

      return sendResponse(
        res,
        HttpStatus.CREATED,
        true,
        null,
        null,
        'Admin created successfully',
        null,
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        null,
        'Internal server error',
        'Internal server error',
        null,
      );
    }
  }
}
