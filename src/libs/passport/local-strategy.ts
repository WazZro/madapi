import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../modules/auth/auth.service';
import User from '../../entities/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.logIn(username, password);
    if (user) return user;
    throw new UnauthorizedException();
  }
}
