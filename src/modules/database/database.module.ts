import { Global, Module } from '@nestjs/common';
import { DATABASE_PROVIDER } from '../../libs/providers/database.provider';

@Global()
@Module({
  providers: [DATABASE_PROVIDER],
  exports: [DATABASE_PROVIDER],
})
export class DatabaseModule {}
