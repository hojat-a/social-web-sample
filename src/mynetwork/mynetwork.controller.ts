import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { MyNetworkService } from './mynetwork.service';
import { Payload } from 'src/common/decorators';
import { QueryDto, CreateMyNetworkDto } from './dto';

@Controller({ path: 'myNetwork', version: '1' })
export class MyNetworkController {
  constructor(private readonly myNetworkService: MyNetworkService) { }

  @Post('/friendRequests')
  async create(@Body() targetUsername: CreateMyNetworkDto, @Payload() { userId }: { userId: number }) {
    try {
      return await this.myNetworkService.makeFriendRequest(targetUsername, userId);
    } catch (error) {
      if (error.errorReason === 'NotFound') {
        throw new HttpException({
          error: error.errorReason,
          message: 'User not found '
        }, HttpStatus.NOT_FOUND);
      }
      else if (error.errorReason === 'SameId') {
        throw new HttpException({
          error: error.errorReason,
          message: 'You can not add yourself as a friend'
        }, HttpStatus.NOT_ACCEPTABLE);
      }
      else if (error.errorReason === 'Duplicated') {
        throw new HttpException({
          error: error.errorReason,
          message: 'Request already exists!'
        }, HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  @Get('/friendRequests/received')
  async findReceivedFriendRequests(@Payload() { userId }: { userId: number }, @Query() { page, pageSize }: QueryDto) {
    return this.myNetworkService.findReceivedFriendRequests(userId, { page, pageSize });
  }

  @Get('/friendRequests/sent')
  async findSentFriendRequests(@Payload() { userId }: { userId: number }, @Query() { page, pageSize }: QueryDto) {
    return this.myNetworkService.findSentFriendRequests(userId, { page, pageSize });
  }

  @Post('/friendRequests/:requestId/accept')
  async acceptFriendRequest(@Param('requestId') requestId: string, @Payload() { userId }: { userId: number }) {
    try {
      return await this.myNetworkService.updateFriendRequestStatus(+userId, requestId, 'Accepted');
    } catch (error) {
      if (error.errorReason === 'NotFound') {
        throw new HttpException({
          error: error.errorReason,
          message: 'Request not found'
        }, HttpStatus.NOT_FOUND);
      }
      else if (error.errorReason === 'AlreadyProcessed') {
        throw new HttpException({
          error: error.errorReason,
          message: 'This request is already processed'
        }, HttpStatus.NOT_ACCEPTABLE);
      }
      throw error;
    }
  }

  @Post('/friendRequests/:requestId/reject')
  async rejectFriendRequest(@Param('requestId') requestId: string, @Payload() { userId }: { userId: number }) {
    try {
      return await this.myNetworkService.updateFriendRequestStatus(+userId, requestId, 'Rejected');
    } catch (error) {
      if (error.errorReason === 'NotFound') {
        throw new HttpException({
          error: error.errorReason,
          message: 'Request not found'
        }, HttpStatus.NOT_FOUND);
      }
      else if (error.errorReason === 'AlreadyProcessed') {
        throw new HttpException({
          error: error.errorReason,
          message: 'This request is already processed'
        }, HttpStatus.NOT_ACCEPTABLE);
      }
      throw error
    }
  }

  @Get('/friends')
  async getFriendsList(@Payload() { userId }: { userId: number }, @Query() { page, pageSize }: QueryDto) {
    return this.myNetworkService.getFriendsList(userId, { page, pageSize });
  }
}
