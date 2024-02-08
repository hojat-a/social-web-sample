import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategy';
import { AtGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register(
      {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
      }
    ),
    UsersModule
  ],
  providers: [
    AuthService,
    AtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ]
})
export class AuthModule { }
