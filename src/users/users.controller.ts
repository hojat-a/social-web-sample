import {
  Controller,
  Body,
  Get,
  Query,
  Param,
  Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Payload } from 'src/common/decorators';
import { QueryDto } from './dto';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/me')
  myData(@Payload() { userId }: { userId: number }) {
    try {
      return this.usersService.findUserById(userId)
    } catch (error) {
      throw error;
    }
  }

  @Get('/:username')
  findOne(@Param('username') username: string) {
    try {
      return this.usersService.findUserByUsername(username)
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findMany(@Query() query: QueryDto) {
    try {
      return this.usersService.findUsers(query)
    } catch (error) {
      throw error;
    }
  }
}
