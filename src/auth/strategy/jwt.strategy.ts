import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User, userDocument } from '../users.schema';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<userDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'BibashPoudel',
    });
  }
  async validate(payload: any): Promise<any> {
    console.log(payload.user.email);
    const user = await this.userModel.findOne({ email: payload.user.email });
    console.log(user);
    return {
      user: {
        id: payload.user._id,
        email: payload.user.email,
        name: payload.user.fullName,
        role: payload.user.role,
      },
    };
  }
}
