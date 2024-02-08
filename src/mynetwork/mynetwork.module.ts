import { Module } from '@nestjs/common';
import { MyNetworkService } from './mynetwork.service';
import { MyNetworkController } from './mynetwork.controller';
import { UsersModule } from 'src/users/users.module';
import { MyNetworkRepository } from './mynetwork.repository';

@Module({
  imports: [UsersModule],
  controllers: [MyNetworkController],
  providers: [MyNetworkService, MyNetworkRepository],
})
export class MyNetworkModule {}
