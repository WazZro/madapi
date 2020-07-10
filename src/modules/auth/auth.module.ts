import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRES,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
} from '../../constants';
import { LocalStrategy } from '../../libs/passport/local-strategy';
import { JwtStrategy } from '../../libs/passport/jwt-strategy';

@Global()
@Module({
  imports: [
    JwtModule.register({
      privateKey: JWT_PRIVATE_KEY,
      publicKey: JWT_PUBLIC_KEY,
      signOptions: {
        expiresIn: ACCESS_TOKEN_EXPIRES,
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
