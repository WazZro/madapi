import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import User from '../../entities/User';
import { Tokenable } from '../../libs/interfaces/tokenable';
import { LocalAuthGuard } from '../../libs/guards/local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../../libs/guards/jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  public async signUp(@Body() user: User): Promise<User & Tokenable> {
    const createdUser = await this.userService.createUser(user);
    return this.authService.createRefreshAccess(createdUser);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  public signIn(@Req() req: Request): User & Tokenable {
    return req.user as User & Tokenable;
  }

  @Post('signin/new_token')
  public refreshToken(@Query('refresh') refreshToken: string): Promise<User & Tokenable> {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  public getMe(@Req() req: Request): User {
    return req.user as User;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  public logOut(@Req() req: Request): Promise<void> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return this.authService.logOut(token);
  }
}
