import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    console.log(token)
    if (token && await this.saveUser(request, token)) return true;
    throw new UnauthorizedException();
  }

  private async saveUser(req: Request, token: string): Promise<boolean> {
    const user = await this.authService.verifyToken(token);
    if (!user) return false;
    req.user = user;
    return true;
  }
}
