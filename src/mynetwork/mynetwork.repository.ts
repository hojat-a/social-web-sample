import { Injectable } from "@nestjs/common";
import { PgProvider } from "src/database/pg/pg.provider";

@Injectable()
export class MyNetworkRepository {
  constructor(private readonly pg: PgProvider) { }

  async addFriendRequest(targetId: number, userId: number) {
    try {
      const newFriendRequest = await this.pg.friendship.create({
        data: {
          senderId: userId,
          receiverId: targetId
        }
      });
      return newFriendRequest
    } catch (error) {
      if (error.code === 'P2002') {
        throw { errorReason: 'Duplicated' }
      }
      throw error;
    }
  }

  async fetchFriendRequestByUsers(targetId: number, userId: number) {
    try {
      const friendRequest = await this.pg.friendship.findFirst({
        where: {
          OR: [
            {
              AND: [
                { senderId: userId },
                { receiverId: targetId }
              ]
            },
            {
              AND: [
                { senderId: targetId },
                { receiverId: userId }
              ]
            }
          ],
          status: {
            in: ['Pending', 'Accepted'],
          },
        },
      })
      return friendRequest
    } catch (error) {
      throw error;
    }
  }

  async fetchFriendRequestById(requestId: string) {
    try {
      const friendRequest = await this.pg.friendship.findUnique({
        where: {
          id: requestId
        }
      })
      return friendRequest
    } catch (error) {
      throw error;
    }
  }

  async fetchSentFriendRequests(userId, { page, pageSize }) {
    try {
      const skip = (page - 1) * pageSize;
      const sentRequestData = await this.pg.friendship.findMany({
        where: {
          senderId: userId,
          status: "Pending"
        },
        skip,
        take: pageSize,
        include: {
          Receiver: {
            select: {
              id: true,
              username: true,
              fname: true,
              lname: true
            }
          }
        }
      })
      const receiversData = []
      for(let req of sentRequestData) {
        req.Receiver['requestId'] = req.id;
        receiversData.push(req.Receiver)
      }
      return receiversData;
    } catch (error) {
      throw error
    }
  }

  async fetchReceivedFriendRequests(userId, { page, pageSize }) {
    try {
      const skip = (page - 1) * pageSize;
      const receivedFriendRequests = await this.pg.friendship.findMany({
        where: {
          receiverId: userId,
          status: "Pending"
        },
        skip,
        take: pageSize,
        include: {
          Sender: {
            select: {
              id: true,
              username: true,
              fname: true,
              lname: true
            }
          }
        }
      })
      const sendersData = []
      for(let req of receivedFriendRequests) {
        req.Sender['requestId'] = req.id;
        sendersData.push(req.Sender)
      }
      return sendersData;
    } catch (error) {
      throw error
    }
  }

  async updateFriendRequestStatus(userId, requestId, status) {
    try {
      return await this.pg.friendship.update({
        where: {
          id: requestId,
          receiverId: userId
        },
        data: {
          status
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async fetchFriendsList(userId, { page, pageSize }) {
    try {
      const skip = (page - 1) * pageSize;
      const friends = await this.pg.friendship.findMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ],
          status: 'Accepted',
        },
        skip,
        take: pageSize,
        include: {
          Sender: {
            select: {
              id: true,
              username: true,
              fname: true,
              lname: true
            }
          },
          Receiver: {
            select: {
              id: true,
              username: true,
              fname: true,
              lname: true
            }
          }
        }
      })
      const friendData = []
      for (let friend of friends) {
        if(friend.senderId == userId) {
          friendData.push(friend.Receiver)
        }
        else {
          friendData.push(friend.Sender)
        }
      }
      return friendData;
    } catch (error) {
      throw error
    }
  }
}