import { Global, Module } from '@nestjs/common';
import { PgProvider } from './pg/pg.provider';

@Global()
@Module({
  providers: [PgProvider],
  exports: [PgProvider],
})
export class DatabaseModule {}