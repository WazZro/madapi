import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { DATABASE_PROVIDER } from './libs/providers/database.provider';
import { DatabaseModule } from './modules/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { STATIC_PATH } from './constants';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FileModule,
    ServeStaticModule.forRoot({
      serveRoot: STATIC_PATH,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DATABASE_PROVIDER,
    // { provide: APP_INTERCEPTOR, useClass: PasswordInterceptor },
  ],
})
export class AppModule {}
