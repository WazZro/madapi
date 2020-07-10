import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_PUBLIC_KEY } from '../../constants';
import User from '../../entities/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpired: false,
      secretOrKey: JWT_PUBLIC_KEY,
    });
  }

  public validate(payload: { id: string | number }): Promise<User> {
    return User.findByPk(payload.id);
  }
}
