import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MyNetworkModule } from './mynetwork/mynetwork.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, MyNetworkModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
