import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: 'test-key',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneBy({
      id: payload.sub,
    });
    if (!user) throw new BadRequestException('user is not authorized');
    return user;
  }
}
