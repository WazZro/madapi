import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from '../../entities/User';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import RefreshToken from '../../entities/RefreshToken';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../../constants';
import { Tokenable } from '../../libs/interfaces/tokenable';
import BlackList from '../../entities/BlackList';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async logIn(
    login: string,
    password: string,
  ): Promise<User & Tokenable> {
    const user = await this.userService.getUserByLogin(login);
    if (await user?.comparePasswords(password)) {
      return this.createRefreshAccess(user);
    }

    return null;
  }

  public async refreshToken(token: string): Promise<User & Tokenable> {
    // @ts-ignore
    const session = await RefreshToken.findByPk(token);
    if (!session) throw new UnauthorizedException();
    return this.createRefreshAccess(session.user);
  }

  public async createRefreshAccess(user: User): Promise<User & Tokenable> {
    const newRefreshToken = await this.createRefresh(user);
    const newAccessToken = await this.createAccess(user);

    return Object.assign(user.toJSON() as User, {
      refresh: newRefreshToken.token,
      newAccessToken,
    });
  }

  public createRefresh(user: User): Promise<RefreshToken> {
    const token = new RefreshToken();
    token.init(user, REFRESH_TOKEN_EXPIRES);
    return token.save();
  }

  public createAccess(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: ACCESS_TOKEN_EXPIRES },
    );
  }

  public async verifyToken(token: string): Promise<User> {
    if (await BlackList.findByPk(token)) return null;

    const user = await this.jwtService.verifyAsync(token);
    if (user?.id) return User.findByPk(user.id);
    return null;
  }

  public async logOut(accessToken: string): Promise<void> {
    const blackListToken = new BlackList();
    blackListToken.token = accessToken;
    await blackListToken.save();
  }
}
