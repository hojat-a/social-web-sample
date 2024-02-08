import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Public } from '../common/decorators';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signIn')
  async signIn(@Body() authDto: SignInDto) {
    try {
      return await this.authService.signIn(authDto);
    } catch (error) {
      if (error.type === 'Unauthorized') {
        throw new HttpException({
          error: 'Unauthorized',
          message: 'Username/Password is not Valid'
        }, HttpStatus.UNAUTHORIZED);
      }
      else {
        throw error;
      }
    }

  }

  @Public()
  @Post('signUp')
  async signUp(@Body() authDto: SignUpDto) {
    try {
      return await this.authService.signUp(authDto);
    } catch (error) {
      if (error.type === 'duplicated') {
        throw new HttpException({
          error: 'Conflict',
          message: 'User exist!!',
        }, HttpStatus.CONFLICT);
      }
      else {
        throw error;
      }
    }

  }
}
