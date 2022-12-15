import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'BibashPoudel',
    });
  }
  async validate(payload: any): Promise<any> {
    console.log(payload.user.email);
    const user = await this.authService.userName({
      username: payload.user.email,
    });
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
