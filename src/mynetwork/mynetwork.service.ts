import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MyNetworkRepository } from './mynetwork.repository';

@Injectable()
export class MyNetworkService {
  constructor(private readonly userService: UsersService, private readonly myNetworkRepository: MyNetworkRepository) { }
  async makeFriendRequest(targetUsername: { username: string }, userId: number) {
    //check user existence
    const targetUser = await this.userService.findUserByUsername(targetUsername.username);
    if (!targetUser?.id) {
      throw { errorReason: 'NotFound' }
    }

    //prevent adding himself
    if (userId === targetUser.id) {
      throw { errorReason: 'SameId' }
    }

    // check request existence
    const req = await this.myNetworkRepository.fetchFriendRequestByUsers(userId, targetUser.id)
    if (req) {
      throw { errorReason: 'Duplicated' }
    }

    const newFriendRequest = await this.myNetworkRepository.addFriendRequest(targetUser.id, userId)
    return { requestId: newFriendRequest.id };
  }


  async findReceivedFriendRequests(userId: number, { page = 1, pageSize = 10 }) {
    return this.myNetworkRepository.fetchReceivedFriendRequests(userId, { page, pageSize })
  }

  async findSentFriendRequests(userId: number, { page = 1, pageSize = 10 }) {
    return this.myNetworkRepository.fetchSentFriendRequests(userId, { page, pageSize })
  }

  async updateFriendRequestStatus(userId: number, requestId: string, status: string) {
    // check the req id existence and the req id belongs to this user
    const req = await this.myNetworkRepository.fetchFriendRequestById(requestId);
    if (!req || req.receiverId !== userId) {
      throw { errorReason: 'NotFound' }
    }

    // user can change pending requests
    if (req.status !== 'Pending') {
      throw { errorReason: 'AlreadyProcessed' }
    }
    
    await this.myNetworkRepository.updateFriendRequestStatus(userId, requestId, status)
    return { message: `Friend request was ${status}!` }
  }

  async getFriendsList(userId: number, { page = 1, pageSize = 10 }) {
    return this.myNetworkRepository.fetchFriendsList(userId, { page, pageSize });
  }
}
